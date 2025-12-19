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

const isProd = process.env.NODE_ENV === "production";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, accessToken, refreshToken } = await userService.loginUser(
      email,
      password
    );

    // Set Access Token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });

    // Set Refresh Token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    });

    //Optional: also set Authorization header
    // res.setHeader("Authorization", `${accessToken}`);

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const userController = { createUser, verifyUser, resendOtp, loginUser };
