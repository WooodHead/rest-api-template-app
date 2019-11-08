import { NextFunction, Request, Response } from "express";

export const apiErrorHandler = (req: Request, res: Response) => (err: any) => {
  res.json({
    message: err.message,
    error: err,
  });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500)
    .json({
      message: err.message,
      error: err,
    });
};
