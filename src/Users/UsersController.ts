import { NextFunction, Request, Response } from "express";
import { apiErrorHandler } from "../handlers/errorHandler";
import { UsersService } from "./UsersService";

export const UserController = {
  getAllUsers(req: Request, res: Response, next: NextFunction) {
    UsersService.getAllUsers({})
      .then((result) => res.json(result))
      .catch(apiErrorHandler(req, res));
  },

  getUserById(req: Request<{ id: string }>, res: any, next: NextFunction) {
    UsersService.getUsersById(req.params.id)
      .then((result) => {
        if (result) {
          return res.json(result);
        } else {
          res.status(404).send(`User ${req.params.id} not found.`);
        }
      })
      .catch(apiErrorHandler(req, res));
  },

  createUser(req: Request, res: Response, next: NextFunction) {
    UsersService.createUser(req.body)
      .then((result) => res.json(result))
      .catch(apiErrorHandler(req, res));
  },

  updateUser(req: Request, res: Response, next: NextFunction) {
    UsersService.updateUser(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch(apiErrorHandler(req, res));
  },

  deleteUser(req: Request, res: Response, next: NextFunction) {
    UsersService.deleteUser(req.params.id)
      .then((result) => res.json(result))
      .catch(apiErrorHandler(req, res));
  },
};
