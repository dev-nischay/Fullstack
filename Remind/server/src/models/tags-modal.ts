import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

export const Tag = mongoose.model("Tag", tagsSchema);
