import {
  Router,
} from "express";
import { Validate } from "../middlewares/validate.js";
import { authSchema } from "../schema/auth-schema.js";
import expressAsyncHandler from "express-async-handler";
import { SignIn,SignUp } from "../controllers/auth-controller.js";

export const authRouter = Router();

authRouter.post('/signup', Validate(authSchema),expressAsyncHandler(SignUp));
authRouter.post('/signin', Validate(authSchema),expressAsyncHandler(SignIn));




