import React from "react";
import profileImage from "../../assets/profile-picture.png";
import { useUserContext } from "../../contexts/UserContext";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router";
import { MdModeEdit } from "react-icons/md";
import { useProfileContext } from "../../contexts/ProfileContext";
import { handleEdit } from "../../utils/helperFunctions";

function UserProfile() {
  const { setEditProfile } = useProfileContext();
  const navigate = useNavigate();
  const { currentUserData, loading } = useUserContext();

  if (loading || !currentUserData) {
    return (
      <div className="w-full bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-2"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Cover Image/Header */}
      <div 
        className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 relative cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        {currentUserData.coverPic && (
          <img
            src={currentUserData.coverPic}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        <div 
          className="absolute right-2 top-2 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(setEditProfile);
          }}
        >
          <FaCamera size={11} />
        </div>
      </div>

      {/* Profile Image (Overlapping) */}
      <div className="px-4 pb-4 flex flex-col items-center relative -mt-8">
        <div 
          className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/profile")}
        >
          <img
            src={currentUserData.profilePic || profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-3 w-full border-b border-gray-200 pb-3.5">
          <h1 
            className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer flex justify-center items-center gap-1"
            onClick={() => navigate("/profile")}
          >
            {currentUserData.firstname} {currentUserData.lastname || ""}
          </h1>
          <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 px-1">
            {currentUserData.headline || "LinkedIn Member"}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {currentUserData.location || ""}
          </p>
        </div>

        {/* Connection Stats / LinkedIn Profile Actions */}
        <div className="w-full pt-3 space-y-2">
          <div 
            className="flex justify-between items-center text-xs cursor-pointer hover:bg-gray-50 p-1 rounded -mx-2 px-2 transition-colors"
            onClick={() => navigate("/connectionrequests")}
          >
            <div className="text-left">
              <span className="text-gray-500 block font-normal">Connections</span>
              <span className="text-gray-800 font-semibold">Grow your network</span>
            </div>
            <span className="text-blue-600 font-semibold">
              {currentUserData.connections?.length || 0}
            </span>
          </div>

          <div 
            className="flex justify-between items-center text-xs cursor-pointer hover:bg-gray-50 p-1 rounded -mx-2 px-2 transition-colors"
            onClick={() => navigate("/profile")}
          >
            <span className="text-gray-500 text-left">Who's viewed your profile</span>
            <span className="text-blue-600 font-semibold">12</span>
          </div>
        </div>

        {/* Edit Button */}
        <button 
          className="mt-3 w-full border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-semibold text-xs py-1 px-3 rounded-full flex items-center justify-center gap-1 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(setEditProfile);
          }}
        >
          <MdModeEdit size={12} />
          Edit profile
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
