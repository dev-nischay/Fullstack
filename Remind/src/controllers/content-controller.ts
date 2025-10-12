import { Content } from "../models/content-modal.js";
import type {
  contentSchema,
  contentBody,
  idBody,
} from "../schema/general-schemas.js";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { HttpStatus } from "../constants/enums.js";

export const createContent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const data: contentBody = req.validatedBody as contentBody;
  await Content.create({
    link: data.link,
    title: data.title,
    userId,
  });

  res.json({
    status: true,
    message: "Content added",
  });
};

export const delContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const contentId = req.validatedParams?.id;

  let content = await Content.findOneAndDelete({
    _id: contentId,
    userId,
  });

  if (!content)
    return next(new AppError("Content Not Found", HttpStatus.NOT_FOUND));

  res.json({
    status: true,
    message: "Content Deleted",
  });
};

export const deleteAllContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userId = req.userId;
  const delAll = await Content.deleteMany({ userId });
  if (!delAll)
    return next(new AppError("No Content to Delete", HttpStatus.NOT_FOUND));

  res.json({
    status: true,
    message: "All content Removed",
  });
};

export const getAllContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const allContent = await Content.find({ userId }).select("-_id -__v -userId");
  if (!allContent)
    return next(new AppError("No Content to Display", HttpStatus.NOT_FOUND));
  res.json({
    status: true,
    content: allContent,
  });
};
