import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true, ref: "User" },
});

export const User = mongoose.model("User", userSchema);
