import React from "react";
import profileImage from "../assets/profile-picture.png";

function ConnectionRequestCard({ request, onAccept, onReject }) {
  const sender = request.sender || {};
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-150 last:border-none gap-4">
      <div className="flex gap-3 min-w-0">
        <img
          src={sender.profilePic || profileImage}
          alt={`${sender.firstname || "User"}`}
          className="w-14 h-14 rounded-full object-cover border border-gray-150 flex-shrink-0"
        />

        <div className="flex flex-col min-w-0">
          <h2 className="font-semibold text-sm text-gray-900 hover:underline cursor-pointer truncate">
            {sender.firstname} {sender.lastname || ""}
          </h2>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {sender.headline || "LinkedIn Member"}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {sender.location || ""}
          </p>
        </div>
      </div>

      <div className="flex gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={() => onReject(request._id)}
          className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
        >
          Ignore
        </button>

        <button
          onClick={() => onAccept(request._id)}
          className="px-4 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs transition-colors cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default ConnectionRequestCard;
