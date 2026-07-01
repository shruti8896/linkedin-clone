import cookieParser from "cookie-parser";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { profileRoutes } from "./routes/profile.routes.js";
import { postRoutes } from "./routes/post.routes.js";
import { connectionRoutes } from "./routes/conection.routes.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/user/currentuser", profileRoutes);
app.use("/api/post", postRoutes);
app.use("/api/connection", connectionRoutes);

export default app;
