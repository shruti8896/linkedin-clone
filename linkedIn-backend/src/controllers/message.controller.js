import {
  sendMessageService,
  getMessagesService,
  getConversationsService,
  markMessagesAsReadService,
} from "../services/message.service.js";

/**
 * Send a new message
 */
export const sendMessageController = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId, text } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    const message = await sendMessageService({ senderId, receiverId, text });
    return res.status(201).json({ message });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Get messages between the current user and another user
 */
export const getMessagesController = async (req, res) => {
  try {
    const userId = req.userId;
    const { otherUserId } = req.params;

    if (!otherUserId) {
      return res.status(400).json({ message: "Other user ID is required" });
    }

    const messages = await getMessagesService(userId, otherUserId);
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Get all conversations (users chatted with + connections) for the current user
 */
export const getConversationsController = async (req, res) => {
  try {
    const userId = req.userId;
    const conversations = await getConversationsService(userId);
    return res.status(200).json({ conversations });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Manually mark messages from another user as read
 */
export const markMessagesAsReadController = async (req, res) => {
  try {
    const userId = req.userId;
    const { otherUserId } = req.params;

    if (!otherUserId) {
      return res.status(400).json({ message: "Other user ID is required" });
    }

    await markMessagesAsReadService(userId, otherUserId);
    return res.status(200).json({ message: "Messages marked as read successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
