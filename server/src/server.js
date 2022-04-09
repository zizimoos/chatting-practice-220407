import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

server.listen(3003, () => {
  console.log(" ✅ Server is running on port 3003");
});

io.on("connection", (socket) => {
  console.log(`🔗 User connected id: ${socket.id}`);

  socket.on("join_room", ({ userName, room }) => {
    socket.join(room);
    socket.emit("joined_room", { userName, room });
    socket.broadcast.to(room).emit("user_joined", { userName, room });
  });

  socket.on("send_message", ({ userName, room, message, time }) => {
    socket.broadcast.to(room).emit("receive_message", {
      userName,
      message,
      time,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔗 User disconnected", socket.id);
  });
});
