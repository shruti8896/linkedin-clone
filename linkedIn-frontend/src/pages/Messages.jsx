import React, { useState, useEffect, useRef } from "react";
import profileImage from "../assets/profile-picture.png";
import Navbar from "../components/Navbar";
import { useUserContext } from "../contexts/UserContext";
import { io } from "socket.io-client";
import {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
} from "../services/messageService";

function Messages() {
  const { currentUserData } = useUserContext();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const messagesEndRef = useRef(null);
  const selectedChatRef = useRef(null);

  // Keep ref up to date for socket listener
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch all conversations
  const fetchConversationsList = async (selectFirst = false) => {
    try {
      const data = await getConversations();
      const convList = data.conversations || [];
      setConversations(convList);
      if (selectFirst && convList.length > 0) {
        setSelectedChat(convList[0]);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoadingConversations(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (currentUserData) {
      fetchConversationsList(true);
    }
  }, [currentUserData]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!currentUserData || !selectedChat) return;

    const fetchMessagesList = async () => {
      setLoadingMessages(true);
      try {
        const otherUserId = selectedChat.user._id;
        const data = await getMessages(otherUserId);
        setMessages(data.messages || []);

        // Clear local unread count for this selected chat
        setConversations((prev) =>
          prev.map((c) =>
            c.user._id === otherUserId ? { ...c, unreadCount: 0 } : c
          )
        );

        // Call backend API to mark as read
        await markMessagesAsRead(otherUserId);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessagesList();
  }, [selectedChat, currentUserData]);

  // Handle Socket Events
  useEffect(() => {
    if (!currentUserData) return;

    const socket = io("http://localhost:8080");

    socket.emit("join", currentUserData._id);

    socket.on("new-message", (newMessage) => {
      const currentUserId = currentUserData._id;

      // Determine who the other participant is
      const senderId = newMessage.sender._id || newMessage.sender;
      const receiverId = newMessage.receiver._id || newMessage.receiver;
      const otherUserId = senderId === currentUserId ? receiverId : senderId;

      const activeChat = selectedChatRef.current;
      const isActive = activeChat && activeChat.user._id === otherUserId;

      // 1. Update the chat window if this message is for the active chat
      if (isActive) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === newMessage._id)) return prev;
          return [...prev, newMessage];
        });

        // Auto mark as read on backend if received from the other user
        if (senderId !== currentUserId) {
          markMessagesAsRead(otherUserId).catch(console.error);
        }
      }

      // 2. Update the conversations list panel
      setConversations((prevConversations) => {
        const existingIndex = prevConversations.findIndex(
          (c) => c.user._id === otherUserId
        );

        let updatedConversations = [...prevConversations];

        if (existingIndex !== -1) {
          const existing = updatedConversations[existingIndex];
          const updated = {
            ...existing,
            lastMessage: newMessage.text,
            lastMessageTime: newMessage.createdAt,
            lastMessageSender: senderId,
            unreadCount:
              !isActive && senderId !== currentUserId
                ? existing.unreadCount + 1
                : existing.unreadCount,
          };

          // Move updated conversation to the top
          updatedConversations.splice(existingIndex, 1);
          updatedConversations.unshift(updated);
        } else {
          // If the user isn't in our conversation list yet, refetch the list
          fetchConversationsList();
        }

        return updatedConversations;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserData]);

  // Send message handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !selectedChat) return;

    const textToSend = newMessageText.trim();
    setNewMessageText("");

    try {
      const receiverId = selectedChat.user._id;
      await sendMessage(receiverId, textToSend);
      // We don't manually append to messages list because the socket listener
      // will receive the broadcasted message and append it gracefully.
    } catch (error) {
      console.error("Failed to send message:", error);
      setNewMessageText(textToSend); // Restore text on failure
    }
  };

  // Helper to format timestamps
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  // Filter conversations by search input
  const filteredConversations = conversations.filter((c) => {
    const fullName = `${c.user.firstname} ${c.user.lastname || ""}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto h-[85vh] bg-white rounded-xl shadow-lg overflow-hidden flex mt-4 border border-gray-200">
        
        {/* Left Panel: Conversation List */}
        <div className="w-[35%] border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
            {loadingConversations ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Loading conversations...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No chats or connections found.
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const isSelected = selectedChat && selectedChat.user._id === conversation.user._id;
                const otherUser = conversation.user;
                return (
                  <div
                    key={otherUser._id}
                    onClick={() => setSelectedChat(conversation)}
                    className={`flex cursor-pointer gap-3 p-4 hover:bg-gray-50 transition items-start ${
                      isSelected ? "bg-blue-50 hover:bg-blue-50" : ""
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={otherUser.profilePic || profileImage}
                        alt={`${otherUser.firstname} ${otherUser.lastname || ""}`}
                        className="h-12 w-12 rounded-full object-cover border border-gray-200"
                      />
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h2 className={`font-semibold text-sm text-gray-900 truncate ${
                          conversation.unreadCount > 0 ? "font-bold" : ""
                        }`}>
                          {otherUser.firstname} {otherUser.lastname || ""}
                        </h2>
                        {conversation.lastMessageTime && (
                          <span className="text-[11px] text-gray-400 flex-shrink-0">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 truncate mb-1">
                        {otherUser.headline || "LinkedIn Member"}
                      </p>

                      <p className={`text-xs truncate ${
                        conversation.unreadCount > 0
                          ? "text-gray-900 font-semibold"
                          : "text-gray-400"
                      }`}>
                        {conversation.lastMessageSender === currentUserData?._id ? "You: " : ""}
                        {conversation.lastMessage || "No messages yet. Send a note!"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Chat Thread */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="border-b border-gray-200 bg-white p-4 flex items-center gap-3">
                <img
                  src={selectedChat.user.profilePic || profileImage}
                  alt={`${selectedChat.user.firstname} ${selectedChat.user.lastname || ""}`}
                  className="h-10 w-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h2 className="font-semibold text-gray-800 text-sm">
                    {selectedChat.user.firstname} {selectedChat.user.lastname || ""}
                  </h2>
                  <p className="text-xs text-gray-400 truncate max-w-lg">
                    {selectedChat.user.headline || "LinkedIn Member"}
                  </p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {loadingMessages ? (
                  <div className="text-center text-sm text-gray-400 py-4">
                    Loading message history...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-sm text-gray-400 py-12 flex flex-col items-center">
                    <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Say hello to {selectedChat.user.firstname}!
                  </div>
                ) : (
                  messages.map((message) => {
                    const isMe = (message.sender._id || message.sender) === currentUserData?._id;
                    return (
                      <div
                        key={message._id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex flex-col max-w-md">
                          <div
                            className={`rounded-2xl px-4 py-2 text-sm ${
                              isMe
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                            }`}
                          >
                            {message.text}
                          </div>
                          <span className={`text-[10px] text-gray-400 mt-1 px-1 ${
                            isMe ? "text-right" : "text-left"
                          }`}>
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="border-t border-gray-200 bg-white p-4 flex gap-3">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  type="submit"
                  disabled={!newMessageText.trim()}
                  className="bg-blue-600 text-white text-sm font-semibold px-5 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-base font-semibold text-gray-700">Your messages</h3>
              <p className="text-xs text-gray-400 mt-1">Select a conversation or connection to start messaging.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Messages;