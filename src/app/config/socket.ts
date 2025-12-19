import { io } from "../../app";

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});
