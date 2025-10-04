import { Feedback } from "../model/db.js";


export const submitFeedback = async(req,res,next) => {
    try {
        let data = req.validatedBody;
        let userid =  req.userId;
        data.userId = userid
        console.log(data)
        await Feedback.create(data)
        res.status(200).json({message:"Feedback Submitted!!"})
        
    } catch (error) {
        next(error)
    }
}