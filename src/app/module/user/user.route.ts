import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/create-user", userController.createUser);
router.post("/verify-otp", userController.verifyUser);
router.post("/resend-otp", userController.resendOtp);
router.post("/login", userController.loginUser);

export const userRoute = router;
