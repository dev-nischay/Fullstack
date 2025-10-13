import { Router } from "express";
export const shareRouter = Router();
import { Validate } from "../middlewares/validate.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../middlewares/auth.js";
import {
  delLink,
  generateLink,
  useLink,
} from "../controllers/brain-controller.js";
import { linkSchema } from "../schema/general-schemas.js";

shareRouter.get(
  "/brain/:hash",
  Validate(linkSchema, "params"),
  expressAsyncHandler(useLink)
); // fetch the data from the link
shareRouter.use(auth);
shareRouter.delete("/brain/stop", expressAsyncHandler(delLink));
shareRouter.post("/brain", expressAsyncHandler(generateLink)); // generate a share linke
