import { ObjectSchema } from "@hapi/joi";
import { NextFunction, Request, Response } from "express";

export const Validate = {
  validateBody: (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.body);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        req.body = result.value;
        next();
      }
    };
  },
};
