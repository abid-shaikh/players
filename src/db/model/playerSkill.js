// ---------------------------------------------------------------------------------------------
// YOU CAN MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// YOU SHOULD NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// ---------------------------------------------------------------------------------------------

module.exports = (sequelize, Sequelize) => {
  const PlayerSkill = sequelize.define("playerSkills", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    skill: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    playerId: {
      // Add this column definition
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "players",
        key: "id",
      },
    },
  });

  return PlayerSkill;
};
