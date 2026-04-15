import express from "express";
import { getCurentUser } from "../controllers/user.controller.js";
import { getCurrentUserToken } from "../middlewares/auth.middleware.js";

export const userRouter = express.Router();

userRouter.get("/currentuser", getCurrentUserToken, getCurentUser);

