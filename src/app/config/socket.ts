import { Server, Socket } from "socket.io";
import { verifyToken } from "../utils/jwt";
import { chatService } from "../module/chat/chat.service";
import { CustomJwtPayload } from "./auth";

interface OnlineUsers {
  [userId: string]: string; // userId -> socketId
}

const onlineUsers: OnlineUsers = {};

export const initializeSocket = (io: Server) => {
  // Socket authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      const decoded = verifyToken(
        token,
        process.env.JWT_SECRET as string
      ) as CustomJwtPayload;
      socket.data.userId = decoded.id;
      next();
    } catch (error) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", async (socket: Socket) => {
    const userId = socket.data.userId as string;
    console.log(`User connected: ${userId} (Socket: ${socket.id})`);

    // Store user's socket ID
    onlineUsers[userId] = socket.id;

    // Join user's personal room
    socket.join(userId);

    // Broadcast user came online
    socket.broadcast.emit("user-online", { userId });

    // Send online users list to newly connected user
    socket.emit("online-users", Object.keys(onlineUsers));

    // Handle sending messages
    socket.on("send-message", async ({ recipientId, text }) => {
      try {
        const message = await chatService.sendMessage(
          userId,
          recipientId,
          text
        );

        // Send to recipient if online
        if (onlineUsers[recipientId]) {
          io.to(recipientId).emit("receive-message", message);
        }

        // Send confirmation to sender
        socket.emit("message-sent", message);
      } catch (error: any) {
        socket.emit("error", { message: error.message });
      }
    });

    // Handle typing indicator
    socket.on("typing", ({ recipientId, isTyping }) => {
      if (onlineUsers[recipientId]) {
        io.to(recipientId).emit("user-typing", {
          userId,
          isTyping,
        });
      }
    });

    // Handle mark as read
    // socket.on("mark-read", async ({ senderId }) => {
    //   try {
    //     await chatService.markAsRead(userId, senderId);
    //     if (onlineUsers[senderId]) {
    //       io.to(senderId).emit("messages-read", { userId });
    //     }
    //   } catch (error) {
    //     console.error("Mark read error:", error);
    //   }
    // });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
      delete onlineUsers[userId];
      socket.broadcast.emit("user-offline", { userId });
    });
  });
};
