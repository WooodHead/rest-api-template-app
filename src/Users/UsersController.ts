import { NextFunction, Request, Response } from "express";
import { apiErrorHandler } from "../handlers/errorHandler";
import { UsersService } from "./UsersService";

export const UserController = {
  getAllUsers(req: Request, res: Response, next: NextFunction) {
    UsersService.getAllUsers({})
      .then((result) => res.json(result))
      .catch((err) => {
        apiErrorHandler(err, req, res, "Fetch All UsersModel failed.");
      });
  },

  getUserById(req: Request<{id: string}>, res: any, next: NextFunction) {
    UsersService.getUsersById(req.params.id)
      .then((result) => {
        if (result) {
          return res.json(result);
        } else {
          res.status(404).send(`User ${req.params.id} not found.`);
        }
      })
      .catch((err) => {
        apiErrorHandler(err, req, res, `User ${req.params.id} failed.`);
      });
  },

  createUser(req: Request, res: Response, next: NextFunction) {
    UsersService.createUser(req.body)
      .then((result) => res.json(result))
      .catch((err) => {
        apiErrorHandler(err, req, res, "Creation of User failed.");
      });
  },

  updateUser(req: Request, res: Response, next: NextFunction) {
    UsersService.updateUser(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch((err) => {
        apiErrorHandler(
          err,
          req,
          res,
          `updation of User ${req.params.id} is failed.`,
        );
      });
  },

  deleteUser(req: Request, res: Response, next: NextFunction) {
    UsersService.deleteUser(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => {
        apiErrorHandler(
          err,
          req,
          res,
          `deletion of User ${req.params.id}  is failed.`,
        );
      });
  },
};
