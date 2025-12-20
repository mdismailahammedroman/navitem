import Message from "./chat.model";
import { io, userSocketMap } from "../../../app";

const sendMessage = async (
  senderId: string,
  recipientId: string,
  payload: { text?: string } // optional fields
) => {
  // Build the payload
  const messageData: {
    sender: string;
    recipient: string;
    text?: string;
  } = {
    sender: senderId,
    recipient: recipientId,
  };

  if (payload.text) messageData.text = payload.text;

  // Save message in DB
  const message = await Message.create(messageData);

  // Send via Socket.IO if recipient is online
  const receiverSocketId = userSocketMap[recipientId];
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", message);
  }

  return message;
};

export const chatService = {
  sendMessage,
};
