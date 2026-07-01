import express from "express";
import { getCurrentUserToken } from "../middlewares/auth.middleware.js";
import {
  acceptConnectionController,
  sendConnectionController,
} from "../controllers/connection.controller.js";
export const connectionRoutes = express.Router();

connectionRoutes.get(
  "/send/:reciever",
  getCurrentUserToken,
  sendConnectionController,
);

connectionRoutes.get(
  "/accept/:connectionId",
  getCurrentUserToken,
  acceptConnectionController,
);
