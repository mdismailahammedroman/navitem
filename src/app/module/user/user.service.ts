import bcrypt from "bcrypt";
import User from "./user.model";
import { sendOTP } from "../../config/mail";

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpires: new Date(Date.now() + 2 * 60 * 1000), // 2 min
    isVerified: false,
  });

  await sendOTP(email, otp);

  return user;
};
const resendOtp = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  if (user.isVerified) {
    throw new Error("User already verified");
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 min
  await user.save();
  await sendOTP(email, otp);

  return { message: "New OTP sent successfully" };
};

const verifyUser = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not exist");
  }
  if (user.isVerified) {
    throw new Error("user already Verified");
  }
  if (user.otp !== otp) {
    throw new Error("invalid Otp");
  }
  if (!user.otpExpires || user.otpExpires < new Date()) {
    throw new Error("OTP expired");
  }

  // Mark user as verified
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return user;
};
const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user not exist");
  }
  if (!user.isVerified) {
    throw new Error("User not verified. Please verify your email first.");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("password invalid");
  }
  return user;
};
export const userService = { createUser, verifyUser, resendOtp, loginUser };
