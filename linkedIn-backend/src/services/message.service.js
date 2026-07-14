import { Message } from "../models/message.model.js";
import User from "../models/user.models.js";
import { getIO } from "../config/socket.js";

/**
 * Send a message
 */
export const sendMessageService = async ({ senderId, receiverId, text }) => {
  try {
    if (!text || text.trim() === "") {
      throw new Error("Message text cannot be empty");
    }

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text: text,
      unread: true,
    });

    const populated = await Message.findById(message._id)
      .populate("sender", "firstname lastname profilePic headline")
      .populate("receiver", "firstname lastname profilePic headline");

    // Real-time socket event trigger
    const ioInstance = getIO();
    if (ioInstance) {
      console.log(`Emitting live message to receiver room: ${receiverId}`);
      ioInstance.to(receiverId.toString()).emit("new-message", populated);
      console.log(`Emitting live message to sender room: ${senderId}`);
      ioInstance.to(senderId.toString()).emit("new-message", populated);
    }

    return populated;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
};

/**
 * Fetch conversation history between two users and mark them as read
 */
export const getMessagesService = async (userId, otherUserId) => {
  try {
    // Fetch messages
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "firstname lastname profilePic headline")
      .populate("receiver", "firstname lastname profilePic headline");

    // Mark incoming messages from the other user as read
    await Message.updateMany(
      { sender: otherUserId, receiver: userId, unread: true },
      { $set: { unread: false } }
    );

    return messages;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw error;
  }
};

/**
 * Mark messages as read manually
 */
export const markMessagesAsReadService = async (userId, otherUserId) => {
  try {
    return await Message.updateMany(
      { sender: otherUserId, receiver: userId, unread: true },
      { $set: { unread: false } }
    );
  } catch (error) {
    console.error("Failed to mark messages as read:", error);
    throw error;
  }
};

/**
 * Fetch all conversations for a user
 * Returns list of users they have chatted with + their connections
 */
export const getConversationsService = async (userId) => {
  try {
    // 1. Find all user IDs the current user has chatted with
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const chattedUserIds = new Set();
    messages.forEach((msg) => {
      if (msg.sender.toString() !== userId.toString()) {
        chattedUserIds.add(msg.sender.toString());
      }
      if (msg.receiver.toString() !== userId.toString()) {
        chattedUserIds.add(msg.receiver.toString());
      }
    });

    // 2. Fetch the user's connections
    const userDoc = await User.findById(userId).select("connections");
    const connectionIds = userDoc?.connections?.map((id) => id.toString()) || [];

    // 3. Combine both lists to get all unique potential conversation users
    const allUserIds = Array.from(new Set([...chattedUserIds, ...connectionIds]));

    // 4. Fetch details of all these users
    const users = await User.find({ _id: { $in: allUserIds } }).select(
      "firstname lastname profilePic headline bio location"
    );

    // 5. For each user, attach their last message and calculate unread count
    const conversations = await Promise.all(
      users.map(async (user) => {
        const lastMsg = await Message.findOne({
          $or: [
            { sender: userId, receiver: user._id },
            { sender: user._id, receiver: userId },
          ],
        }).sort({ createdAt: -1 });

        const unreadCount = await Message.countDocuments({
          sender: user._id,
          receiver: userId,
          unread: true,
        });

        return {
          user,
          lastMessage: lastMsg ? lastMsg.text : null,
          lastMessageTime: lastMsg ? lastMsg.createdAt : null,
          lastMessageSender: lastMsg ? lastMsg.sender : null,
          unreadCount,
        };
      })
    );

    // 6. Sort conversations:
    //    First, sort by lastMessageTime descending (most recent messages first).
    //    Second, place users with no messages at the end.
    conversations.sort((a, b) => {
      if (a.lastMessageTime && b.lastMessageTime) {
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      }
      if (a.lastMessageTime) return -1;
      if (b.lastMessageTime) return 1;
      return a.user.firstname.localeCompare(b.user.firstname);
    });

    return conversations;
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    throw error;
  }
};
