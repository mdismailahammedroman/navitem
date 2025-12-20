import Message, { IMessage } from "./chat.model";
import User from "../user/user.model";
import { io } from "../../../app";

const sendMessage = async (
  senderId: string,
  recipientId: string,
  text: string
) => {
  // Validate users
  const [sender, recipient] = await Promise.all([
    User.findById(senderId),
    User.findById(recipientId),
  ]);

  if (!sender || !recipient) {
    throw new Error("Sender or recipient not found");
  }

  // Save message
  const message = await Message.create({
    sender: senderId,
    recipient: recipientId,
    text,
    timestamp: new Date(),
  });

  const populatedMessage = await message.populate("sender", "name email");

  // Send to recipient
  io.to(recipientId).emit("receive-message", populatedMessage);
  console.log(`Message sent to recipient (${recipientId}):`, populatedMessage);

  // Optional: send back to sender
  io.to(senderId).emit("message-sent", populatedMessage);
  console.log(`Message sent back to sender (${senderId}):`, populatedMessage);

  return populatedMessage;
};

export const chatService = {
  sendMessage,
};
