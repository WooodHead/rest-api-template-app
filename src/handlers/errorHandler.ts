import { NextFunction, Request, Response } from "express";

export function unCoughtErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.end({error: err});
}

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string,
) {
  res.json({Message: message});
}
