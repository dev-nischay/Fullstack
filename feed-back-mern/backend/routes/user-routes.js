import { loginUser,createAccount } from "../controllers/authController.js";
import  Router  from "express";
const userRouter  = Router();
import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js";
import { signInSchema,signUpSchema,feedbackSchema } from "../validators/zod-schema.js";
import { submitFeedback } from "../controllers/userController.js";

userRouter.post("/signup",validate(signUpSchema),createAccount)
userRouter.post ("/signin",validate(signInSchema),loginUser)


//---------------- Auth routes below

userRouter.post("/feedback",auth,validate(feedbackSchema),submitFeedback)







export default userRouter;