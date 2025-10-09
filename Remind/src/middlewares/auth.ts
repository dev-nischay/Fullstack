import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { HttpStatus } from "../constants/enums.js";
const secret = process.env.JWT_SECRET;
const Verify = (token: string): Promise<any> => {
  return new Promise((res, rej) => {
    jwt.verify(token, secret!, (err, payload) => {
      err ? rej(err) : res(payload);
    });
  });
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.length === 0)
    return new AppError("header is missing", HttpStatus.NOT_FOUND);

  const token = authHeader.split(" ")[1];
  if (!token || token.length === 0)
    return next(new AppError("Token not found", HttpStatus.NOT_FOUND));

  try {

    let verify = await Verify(token);
    req.userId = verify.id; // this will go away after we creating a sign route
    next();
  } catch (error) {
    next( new AppError("Invalid Token", HttpStatus.FORBIDDEN))
  }
};
