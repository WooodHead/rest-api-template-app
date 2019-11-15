import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  private statusCode: number;
  private type: string | undefined;

  constructor(name: string, statusCode: number, type?: string, message?: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.type = type;
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500)
    .json({
      message: err.message,
      error: err,
    });
};
