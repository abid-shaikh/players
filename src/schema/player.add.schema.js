import Joi from "joi";

export const addPlayerSchema = Joi.object({
  name: Joi.string().required(),
  position: Joi.string()
    .valid("defender", "midfielder", "forward")
    .required()
    .messages({
      "any.only": "Invalid value for position: {{#value}}",
    }),
  playerSkills: Joi.array().items({
    skill: Joi.string().required(),
    value: Joi.number().required(),
  }),
});

export const updatePlayerSchema = addPlayerSchema.append({
  playerId: Joi.number().required(),
});
