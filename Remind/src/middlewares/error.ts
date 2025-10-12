import type { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/AppError.js";
import { HttpStatus } from "../constants/enums.js";

export const ErrorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const statusCode = err.Statuscode || HttpStatus.INTERNAL_SERVER_ERROR;

    if (err.isOperational) {
      return res.status(statusCode).json({
        status: false,
        error: err.message,
      });
    }

    console.error("UNEXPECTED NON-OPERATIONAL ERROR:", err);

    return res.status(statusCode).json({
      status: false,
      error: "A critical server error occurred. Please report this issue.",
    });
  }

  console.error("UNHANDLED GENERIC ERROR:", err);

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: false,
    error: "An unknown server error occurred. Please try again later.",
  });
};
