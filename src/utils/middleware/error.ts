import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../types/AppError";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.data && { details: err.data }),
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      message: err.message || "Unexpected error",
    });
    return;
  }

  res.status(500).json({
    message: "Unknown error",
  });
  return;
};
