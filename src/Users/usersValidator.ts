import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

export const UsersValidator = {

  validateBody: (schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        // @ts-ignore
        if (!req.value) {
          // @ts-ignore
          req.value = {};
        }
        // @ts-ignore
        if (!req.value.body) {
          // @ts-ignore
          req.value.body = {};
        }
        // @ts-ignore
        req.value.body = result.value;
        next();
      }
    };
  },
};

export const usersSchema = Joi.object().keys({
  description: Joi.string().trim(),
  name: Joi.string().trim(),
});
