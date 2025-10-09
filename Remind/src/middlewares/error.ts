import type {
  NextFunction,
  Response,
  Request,
} from "express";
import { AppError } from "../utils/AppError.js";
import { HttpStatus } from "../constants/enums.js";
export const ErrorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    let statusCode = err.Statuscode || HttpStatus.INTERNAL_SERVER_ERROR;
    if (err.isOperational) {
      res.status(statusCode).json({
        status: false,
        error: err.message,
      });
    }else{
console.error("Unexpected Error", err);

    res.status(statusCode).json({
      status: false,
      error: `Something went wrong ${err.message}`,
    });
    }
    
  }
};
