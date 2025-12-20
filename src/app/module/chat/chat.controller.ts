import { Request, Response } from "express";
import { chatService } from "./chat.service";

const sendMessage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const senderId = req.user.id;
    const { recipientId, text } = req.body;

    if (!recipientId || !text) {
      return res
        .status(400)
        .json({ error: "Recipient ID and text are required" });
    }

    const message = await chatService.sendMessage(senderId, recipientId, text);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const chatController = {
  sendMessage,
};
