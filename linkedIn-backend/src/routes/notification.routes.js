import express from "express";
import { getCurrentUserToken } from "../middlewares/auth.middleware.js";
import {
    getNotificationsController,
    markAllAsReadController,
    deleteNotificationController,
} from "../controllers/notification.controller.js";

export const notificationRoutes = express.Router();

notificationRoutes.get("/", getCurrentUserToken, getNotificationsController);
notificationRoutes.put("/mark-read", getCurrentUserToken, markAllAsReadController);
notificationRoutes.delete("/:id", getCurrentUserToken, deleteNotificationController);
