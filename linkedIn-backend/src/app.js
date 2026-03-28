import cookieParser from "cookie-parser";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);

export default app;
