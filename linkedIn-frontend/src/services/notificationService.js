import axios from "axios";

const API_URL = `${import.meta.env.BACKEND_URL}/api/notification`;

export const getNotifications = async () => {
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error.response?.data || error.message;
    }
};

export const markAllAsRead = async () => {
    try {
        const response = await axios.put(`${API_URL}/mark-read`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error marking notifications read:", error);
        throw error.response?.data || error.message;
    }
};

export const deleteNotification = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error deleting notification:", error);
        throw error.response?.data || error.message;
    }
};
