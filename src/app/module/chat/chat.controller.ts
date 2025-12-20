import { Request, Response } from "express";
import { chatService } from "./chat.service";
import { CustomJwtPayload } from "../../config/auth";

const sendMessage = async (req: Request, res: Response) => {
  try {
    const user = req.user as CustomJwtPayload;
    const senderId = user.id; // ID from JWT
    const { recipientId, text } = req.body;

    // Pass payload as object
    const message = await chatService.sendMessage(senderId, recipientId, {
      text,
    });
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const chatController = {
  sendMessage,
};
