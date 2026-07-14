import React, { useState, useEffect } from "react";
import profileImage from "../assets/profile-picture.png";
import {
  FaUserPlus,
  FaHeart,
  FaCommentDots,
  FaBriefcase,
  FaTrash,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  getNotifications,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService";
import { useUserContext } from "../contexts/UserContext";
import { io } from "socket.io-client";
import { getTimeAgo } from "../utils/helperFunctions";

function getIcon(type) {
  switch (type) {
    case "connection":
      return <FaUserPlus className="text-blue-600" size={18} />;
    case "like":
      return <FaHeart className="text-red-500" size={18} />;
    case "comment":
      return <FaCommentDots className="text-green-600" size={18} />;
    case "job":
      return <FaBriefcase className="text-purple-600" size={18} />;
    default:
      return null;
  }
}

function Notifications() {
  const [notificationsList, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUserData } = useUserContext();

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!currentUserData?._id) return;

    const socket = io("http://localhost:8080");

    socket.emit("join", currentUserData._id);

    socket.on("new-notification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserData]);

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, unread: false }))
      );
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Avoid triggering any container click
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg my-6">
        {/* Header */}
        <div className="border-b p-5 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Notifications</h1>

          {notificationsList.some((n) => n.unread) && (
            <button
              onClick={handleMarkAllRead}
              className="text-blue-600 font-medium hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading notifications...
          </div>
        ) : notificationsList.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            You don't have any notifications.
          </div>
        ) : (
          /* Notification List */
          <div className="divide-y">
            {notificationsList.map((notification) => (
              <div
                key={notification._id}
                className={`flex gap-4 items-center p-5 hover:bg-gray-50 transition cursor-pointer group ${notification.unread ? "bg-blue-50" : ""
                  }`}
              >
                {/* Profile Picture */}
                <img
                  src={notification.sender?.profilePic || profileImage}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                />

                {/* Text Description */}
                <div className="flex-1">
                  <p className="text-gray-800">
                    <span className="font-semibold">
                      {notification.sender
                        ? `${notification.sender.firstname} ${notification.sender.lastname}`
                        : "Someone"}
                    </span>{" "}
                    {notification.message}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {getTimeAgo(notification.createdAt)}
                  </p>
                </div>

                {/* Notification Icon Type */}
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                  {getIcon(notification.type)}
                </div>

                {/* Blue Dot for unread */}
                {notification.unread && (
                  <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                )}

                {/* Trash Icon for deletion */}
                <button
                  onClick={(e) => handleDelete(notification._id, e)}
                  className="text-gray-400 hover:text-red-500 p-2 rounded transition md:opacity-0 group-hover:opacity-100"
                  title="Delete notification"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
