import * as Joi from "@hapi/joi";

export const usersSchema = Joi.object({
  description: Joi.string().trim(),
  name: Joi.string().trim(),
});
