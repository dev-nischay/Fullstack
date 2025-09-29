import mongoose from "mongoose";
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;





const userSchema = new Schema ({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
})



const feedbackSchema = new Schema ({
    title:{type:String,required:true}, // how was your exp
    rating:{type:String,required:true}, // event rating 
    userId:{type:ObjectId,required:true}, // who published
    other:{type:String} // any feedback they wanna give
})




export const User = new mongoose.model("user",userSchema)
export const Feedback = new mongoose.model("feedback",feedbackSchema);





