import { NextFunction, Request, Response } from "express";
import { apiErrorHandler } from "../handlers/errorHandler";
import { IUsersDTO, toResult } from "./UsersModel";
import { UsersService } from "./UsersService";

export const UserController = {
  getAllUsers(req: Request, res: Response, next: NextFunction) {
    const attributes: (keyof IUsersDTO)[] = ["id", "name"];
    const page = req.query.page > 0 ? req.query.page - 1 : req.query.page;
    const limit = req.query.limit;
    UsersService.getAllUsers({
      attributes,
      limit,
      offset: limit ? page * limit : undefined,
      order: [
        ["createdAt", "DESC"],
      ],
    })
      .then((result) => res.json(toResult(result)))
      .catch(apiErrorHandler(req, res));
  },

  getUserById(req: Request<{ id: string }>, res: any, next: NextFunction) {
    const attributes: (keyof IUsersDTO)[] = ["id", "name"];
    UsersService.getUsersById(req.params.id, {
      attributes,
    })
      .then((result) => {
        if (result) {
          return res.json(toResult(result));
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
