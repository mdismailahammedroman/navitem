import { Router } from "express";
import { authMiddleware } from "../../config/auth";
import { chatController } from "./chat.controller";

const router = Router();

// All chat routes require authentication
router.use(authMiddleware);

router.post("/send", chatController.sendMessage);

export const chatRoute = router;
