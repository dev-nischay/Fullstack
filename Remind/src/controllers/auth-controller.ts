import type { Request,Response,NextFunction } from "express"
import bcrypt from "bcrypt"
import type {authBody } from "../schema/auth-schema.js"
import { AppError } from "../utils/AppError.js"
import { User } from "../models/user-model.js"
import { HttpStatus } from "../constants/enums.js"
import jwt from "jsonwebtoken"


export const SignUp = async(req:Request,res:Response,next:NextFunction) => {
    const {username,password}= req.validatedBody as authBody;

    let userExists = await User.findOne({username})
    if(userExists) return  next(new AppError("User already Exists",HttpStatus.FORBIDDEN))
    
    let hashPass =  await bcrypt.hash(password,8)
        await User.create({
            username,
            password:hashPass
        })
   
    res.json({
        status:true,
        message:"You are Signed Up"
    })

}

export const SignIn = async(req:Request,res:Response,next:NextFunction):Promise<void> => {
    const {username,password} = req.validatedBody as authBody

    let userExists = await User.findOne({username})
    if(!userExists) return next(new AppError("User not Found",HttpStatus.NOT_FOUND))

    let isPasswordValid = await bcrypt.compare(password,userExists.password)
    if(!isPasswordValid) return next(new AppError("Invalid Passoword",HttpStatus.FORBIDDEN))
    
    let token = jwt.sign({
        id:userExists._id
    },process.env.JWT_SECRET!)

    res.json({
        status:true,
        message:"You are Signed in",
        token
    })


}