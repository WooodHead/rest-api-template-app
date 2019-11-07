import { Application } from "express";
import { UsersRouter } from "./Users/routes";

export const initRoutes = (app: Application) => {
  app.use("/api/users", UsersRouter);
};
