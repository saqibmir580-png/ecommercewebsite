import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exists" });
    }
    const hasdpassword = await bcrypt.hash(password, 10);
    user = {
      name,
      email,
      password: hasdpassword,
    };
    const otp = Math.floor(Math.random() * 1000000);
    const activationToken = jwt.sign(
      { user, otp },
      process.env.Activation_Secret,
      { expiresIn: "5m" }
    );
    const data = {
      name,
      otp,
    };
    await sendMail(email, "e-learning", data);
    res.status(200).json({
      message: "Otp send to your mail",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.Activation_Secret);
  if (!verify) {
    return res.status(400).json({
      message: "Otp Expired",
    });
  }
  if (verify.otp !== otp) {
    return res.status(400).json({
      message: "Wrong Otp",
    });
  }
  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });
  res.json({
    message: "User Registered",
  });
});
//login
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "No User with this email",
    });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).json({
      message: "Wrong Password",
    });
  }
  //verify token
  const token = await jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "5d",
  });
  res.json({
    message: `Wellcome back ${user.name}`,
    token,
    user,
  });
});
//profile

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});
