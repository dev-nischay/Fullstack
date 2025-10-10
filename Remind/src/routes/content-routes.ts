import { Router } from "express";
import { Validate } from "../middlewares/validate.js";
import expressAsyncHandler from "express-async-handler";
import { contentSchema, objectIdschema } from "../schema/general-schemas.js";
import { auth } from "../middlewares/auth.js";
import { createContent, delContent, deleteAllContent } from "../controllers/content-controller.js";
export const contentRouter = Router();





contentRouter.use("/",auth)
contentRouter.route('/').
post(Validate(contentSchema),expressAsyncHandler(createContent))
.delete(expressAsyncHandler(deleteAllContent))
// .post(Validate(contentSchema),expressAsyncHandler(createContent))
contentRouter.delete("/:id",Validate(objectIdschema,"params"),expressAsyncHandler(delContent))



