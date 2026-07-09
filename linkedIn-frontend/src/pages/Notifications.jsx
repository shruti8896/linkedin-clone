import React from "react";
import profileImage from "../assets/profile-picture.png";
import {
  FaUserPlus,
  FaHeart,
  FaCommentDots,
  FaBriefcase,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const notifications = [
  {
    id: 1,
    type: "connection",
    name: "Rahul Sharma",
    message: "sent you a connection request.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    type: "like",
    name: "Ananya Gupta",
    message: "liked your post.",
    time: "10m ago",
    unread: true,
  },
  {
    id: 3,
    type: "comment",
    name: "Amit Verma",
    message: 'commented: "Great explanation 👏"',
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    type: "job",
    name: "LinkedIn Jobs",
    message: "A new React Developer role matches your profile.",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "connection",
    name: "Priya Singh",
    message: "accepted your connection request.",
    time: "Yesterday",
    unread: false,
  },
];

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
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="border-b p-5 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Notifications</h1>

          <button className="text-blue-600 font-medium hover:underline">
            Mark all as read
          </button>
        </div>

        {/* Notification List */}
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-4 items-center p-5 hover:bg-gray-50 transition cursor-pointer ${
                notification.unread ? "bg-blue-50" : ""
              }`}
            >
              {/* Profile */}
              <img
                src={profileImage}
                alt=""
                className="h-14 w-14 rounded-full"
              />

              {/* Text */}
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-semibold">{notification.name}</span>{" "}
                  {notification.message}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>

              {/* Notification Type */}
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                {getIcon(notification.type)}
              </div>

              {/* Blue Dot */}
              {notification.unread && (
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
