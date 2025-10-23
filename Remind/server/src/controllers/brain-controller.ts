import type { NextFunction, Request, Response } from "express";
import { Link } from "../models/link-modal.js";
import { v4 as uuid } from "uuid";
import { AppError } from "../utils/AppError.js";
import { HttpStatus } from "../constants/enums.js";
import type { linkBody } from "../schema/general-schemas.js";
import { Content } from "../models/content-modal.js";
import type { authBody } from "../schema/auth-schema.js";
export const generateLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { share } = req.body;
  const userId = req.userId;
  // user can only have 1 link so if it tries to generate again we return the same link
  if (share) {
    const exisitingLink = await Link.findOne({ userId });

    if (exisitingLink) {
      res.json({
        status: true,
        message: "Link Sent",
        link: exisitingLink.hash,
      });
      return;
    }

    const newLink = await Link.create({
      hash: uuid(), // generates a random string for the url
      userId,
    });

    res.json({
      status: true,
      message: "Link generated",
      link: newLink.hash,
    });
  }

  if (!share) {
    return next(new AppError("Must include share key", HttpStatus.NOT_FOUND));
  }
  // change this later and create this share property in the User collection itself
  // also create seperate  response for delete and generateLink
  // for delelting a link create a sepereate route
};

export const delLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { share } = req.body;
  const userId = req.userId;

  if (share === false) {
    let found = await Link.findOneAndDelete({ userId });
    if (!found) {
      res.send(`not found the link the link :${userId}`);
    }
    res.json({
      status: true,
      message: "Your content has been stopped from being shared",
    });
    return;
  } else {
    next(new AppError("share key must be included", HttpStatus.NOT_FOUND));
  }
};

export const useLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { hash } = req.validatedParams as linkBody;

  console.log(hash);
  // extract hash from the whole link
  const shareId = await Link.findOne({ hash }).populate("userId");
  if (!shareId) {
    return next(new AppError("content not found ", HttpStatus.NOT_FOUND));
  }

  console.log(shareId);

  const sharedContent = await Content.find({ userId: shareId.userId }).select(
    "-_id -__v -userId"
  );

  res.json({
    status: true,
    message: "content found",
    username: (shareId?.userId as authBody).username,
    content: sharedContent,
  });
};
