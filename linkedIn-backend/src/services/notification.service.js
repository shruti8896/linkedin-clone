import { Notification } from "../models/notification.model.js";
import { getIO } from "../config/socket.js";

export const getNotificationsService = async (userId) => {
    try {
        return await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .populate("sender", "firstname lastname profilePic headline");
    } catch (error) {
        throw error;
    }
};

export const markAllAsReadService = async (userId) => {
    try {
        return await Notification.updateMany(
            { recipient: userId, unread: true },
            { $set: { unread: false } }
        );
    } catch (error) {
        throw error;
    }
};

export const deleteNotificationService = async (notificationId, userId) => {
    try {
        const notification = await Notification.findOne({ _id: notificationId, recipient: userId });
        if (!notification) {
            throw new Error("Notification not found or unauthorized");
        }
        return await Notification.findByIdAndDelete(notificationId);
    } catch (error) {
        throw error;
    }
};

export const createNotificationService = async ({ recipient, sender, type, post, message }) => {
    try {
        // Avoid sending notifications to oneself
        if (recipient.toString() === sender.toString()) {
            return null;
        }

        const notification = await Notification.create({ recipient, sender, type, post, message });
        const populated = await Notification.findById(notification._id)
            .populate("sender", "firstname lastname profilePic headline");

        // Real-time socket event trigger
        const ioInstance = getIO();
        if (ioInstance) {
            console.log(`Emitting live notification to room: ${recipient}`);
            ioInstance.to(recipient.toString()).emit("new-notification", populated);
        }

        return populated;
    } catch (error) {
        console.error("Failed to create notification:", error);
        throw error;
    }
};
