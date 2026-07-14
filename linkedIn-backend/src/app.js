import cookieParser from "cookie-parser";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { profileRoutes } from "./routes/profile.routes.js";
import { postRoutes } from "./routes/post.routes.js";
import { connectionRoutes } from "./routes/conection.routes.js";
import { notificationRoutes } from "./routes/notification.routes.js";
import messageRoutes from "./routes/message.routes.js";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./config/socket.js";

const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});
initSocket(io);
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/user/currentuser", profileRoutes);
app.use("/api/post", postRoutes);
app.use("/api/connection", connectionRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/messages", messageRoutes);

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

export default app;
