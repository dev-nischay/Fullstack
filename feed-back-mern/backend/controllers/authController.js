import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../model/db.js";
const secret = process.env.JWT_SECRET;

export const createAccount = async (req, res, next) => {
  try {
    let { email, username, password } = req.validatedBody;
    console.log("check");
    let exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ error: "Account already exists" });
    let hashedpass = await bcrypt.hash(password, 10);
    await User.create({
      email,
      username,
      password: hashedpass,
    });
    res.status(200).json({ message: "Account created successfully!!" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let { email, username, password } = req.validatedBody;
    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Account not found" });
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Incorrect Password" });
    let token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login Successfull!!!", token });
  } catch (error) {
    next(error);
  }
};
