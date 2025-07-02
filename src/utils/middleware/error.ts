import { Request, Response, ErrorRequestHandler } from "express";
import { AppError } from "../types/AppError";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
) => {
  if (err instanceof AppError) {
    let json_err_body = {
      message: err.message,
    }
    if(err.data && err.data.constructor === Object){
      json_err_body = {
        ...json_err_body,
        ...err.data
      }
    }
    res.status(err.statusCode).json(json_err_body);
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
