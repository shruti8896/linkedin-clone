import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/messages`;

/**
 * Fetch all conversations for the current user
 */
export const getConversations = async () => {
  try {
    const response = await axios.get(`${API_URL}/conversations`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Fetch chat history with another user
 */
export const getMessages = async (otherUserId) => {
  try {
    const response = await axios.get(`${API_URL}/${otherUserId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Send a message to another user
 */
export const sendMessage = async (receiverId, text) => {
  try {
    const response = await axios.post(
      API_URL,
      { receiverId, text },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Mark messages from another user as read
 */
export const markMessagesAsRead = async (otherUserId) => {
  try {
    const response = await axios.put(
      `${API_URL}/read/${otherUserId}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw error.response?.data || error.message;
  }
};
