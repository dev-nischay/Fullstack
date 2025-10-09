import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { HttpStatus } from "../constants/enums.js";
import type { ZodObject } from "zod";

type source = "body" | "params" | "query";
export const Validate = (schema: ZodObject, source: source = "body") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = req[source];
      let parsed = schema.safeParse(data);
      if (!parsed.success) {
        let errors = parsed.error.issues.map((e) => e.message);
        return next(new AppError(String(errors), HttpStatus.LENGHT_REQUIRED));
      }

      if (source === "body") {
        req.validatedBody = parsed.data;
      } else if (source === "params") {
        req.validatedParams = parsed.data;
      } else {
        req.validatedQuery = parsed.data;
      }
      console.log(`Validation Success ✅ source:${source}`);
      next();
    } catch (error) {
      next( new AppError(
        `Something went wrong ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      ))
    }
  };
};
