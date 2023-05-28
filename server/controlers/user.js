import User from "../models/user.js";
import Token from "../models/token.js";
import mongoose from "mongoose";
import { generateOTP, mailPassReset, mailTransport } from "../tool/mail.js";

//for login
export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Password Incorect" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//for register
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Enter email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No Account Found with this Email" });
    }
    if (user.password === password) {
      return res
        .status(401)
        .json({ message: "Password must not be the same as Old Password" });
    }
    const otp = generateOTP();
    const token = new Token({
      owner: user._id,
      token: otp,
    });
    await token.save();
    console.log(otp);

    mailTransport({ otp, user });
    await token.save();
    return res.status(200).send({ result: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const resetPasswordOTP = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const { id } = req.params;
    //check if the valid params
    if (!id || !otp.trim() || !password)
      return res.status(400).json({ message: "Invalid Request no ID or OTP" });
    // check if tama yung id
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: "Invalid Accommodator" });
    }

    const user = await User.findById(id);
    // kung tama yung yung account
    if (!user) {
      return res.status(404).json({ message: "Account not Found" });
    }
    const token = await Token.findOne({ owner: user._id });
    if (!token) return res.status(404).json({ message: "Token not found" });
    const isMatch = await token.compareToken(otp);
    if (!isMatch) return res.status(500).json({ message: "OTP not match" });
    user.password = password;
    await Token.findOneAndDelete(token._id);
    await user.save();

    mailPassReset(user.email);
    res.status(200).json({ result: user });
  } catch (err) {
    return res.status(500).json({ message: `${err.message}` });
  }
};
