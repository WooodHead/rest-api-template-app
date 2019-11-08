import { Request, Response } from "express";

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string,
) {
  res.json({Message: message});
}
