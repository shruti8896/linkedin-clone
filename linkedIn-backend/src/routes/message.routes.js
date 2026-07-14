import express from "express";
import {
  sendMessageController,
  getMessagesController,
  getConversationsController,
  markMessagesAsReadController,
} from "../controllers/message.controller.js";
import { getCurrentUserToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all message routes
router.use(getCurrentUserToken);

router.get("/conversations", getConversationsController);
router.get("/:otherUserId", getMessagesController);
router.post("/", sendMessageController);
router.put("/read/:otherUserId", markMessagesAsReadController);

export default router;
