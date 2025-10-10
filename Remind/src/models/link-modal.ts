import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true, ref: "User" },
});

export const Link = mongoose.model("Link", linkSchema);
