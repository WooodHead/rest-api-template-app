import { Application } from "express";
import { UsersRouter } from "./Users/routes";

export const InitApiRoutes = (app: Application) => {
  app.use("/api/users", UsersRouter);
};
