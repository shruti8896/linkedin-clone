import {
    getNotificationsService,
    markAllAsReadService,
    deleteNotificationService,
} from "../services/notification.service.js";

export const getNotificationsController = async (req, res) => {
    try {
        const userId = req.userId;
        const notifications = await getNotificationsService(userId);
        return res.status(200).json({ notifications });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const markAllAsReadController = async (req, res) => {
    try {
        const userId = req.userId;
        await markAllAsReadService(userId);
        return res.status(200).json({ message: "All notifications marked as read." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteNotificationController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        await deleteNotificationService(id, userId);
        return res.status(200).json({ message: "Notification deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
