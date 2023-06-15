import CustomErrorHandler from "../../middleware/custom.error.handler";
import {
  addPlayerSchema,
  updatePlayerSchema,
} from "../../schema/player.add.schema";

const db = require("../../db/model/index");

const playerController = {
  async addPlayer(req, res, next) {
    const { name, position, playerSkills } = req.body;
    const { error } = addPlayerSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    try {
      const player = await db.Player.create({ name, position });

      const playerSkillsData = playerSkills.map((skill) => ({
        skill: skill.skill,
        value: skill.value,
        playerId: player.id,
      }));

      await db.PlayerSkill.bulkCreate(playerSkillsData);

      const createdPlayer = await db.Player.findByPk(player.id, {
        include: [{ model: db.PlayerSkill, as: "playerSkills" }],
      });

      res.status(201).json(createdPlayer);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },

  async updatePlayer(req, res, next) {
    const playerId = parseInt(req.params.playerId);
    const { name, position, playerSkills } = req.body;
    const { error } = updatePlayerSchema.validate({ ...req.body, playerId });

    if (error) {
      return next(error);
    }
    try {
      const player = await db.Player.findByPk(playerId);

      if (!player) {
        return next(CustomErrorHandler.notFound(404, "Player not found"));
      }

      if (name) {
        player.name = name;
      }
      if (position) {
        player.position = position;
      }

      await player.save();

      if (playerSkills) {
        await db.PlayerSkill.destroy({ where: { playerId: player.id } });

        const playerSkillsData = playerSkills.map((skill) => ({
          skill: skill.skill,
          value: skill.value,
          playerId: player.id,
        }));

        await db.PlayerSkill.bulkCreate(playerSkillsData);
      }

      const updatedPlayer = await db.Player.findByPk(playerId, {
        include: [{ model: db.PlayerSkill, as: "playerSkills" }],
      });

      return res.json(updatedPlayer);
    } catch (error) {
      return next(error);
    }
  },
};

export default playerController;
