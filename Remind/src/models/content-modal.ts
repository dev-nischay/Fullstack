import mongoose, { Types, Schema } from "mongoose";

const contentSchema = new Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const Content = mongoose.model("Content", contentSchema);
