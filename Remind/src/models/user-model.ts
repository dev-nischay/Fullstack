import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model("user", userSchema);

User.create({
  age: 243,
});
