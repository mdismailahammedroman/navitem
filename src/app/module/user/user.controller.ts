import { userService } from "./user.service";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({ message: "OTP sent to email", userId: user._id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
const verifyUser = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const result = await userService.verifyUser(email, otp);
    res.json({ message: "User verified successfully", result });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const resendOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const result = await userService.resendOtp(email);
    res.json({ message: "OTP sent to email" });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const userController = { createUser, verifyUser, resendOtp, loginUser };
