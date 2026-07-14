import React from "react";
import profileImage from "../assets/profile-picture.png";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import { logoutUser } from "../services/authServices";

function PopUpCard() {
  const navigate = useNavigate();

  const { currentUserData, setCurrentUserAccessToken, logout } =
    useUserContext();

  async function handleLogout() {
    try {
      await logoutUser();
      setCurrentUserAccessToken(null);
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  if (!currentUserData) return null;

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden flex flex-col animate-in fade-in duration-100">
      {/* User Info Header Row */}
      <div className="p-4 flex gap-3">
        <img
          src={currentUserData.profilePic || profileImage}
          alt="Avatar"
          className="h-14 w-14 rounded-full object-cover border border-gray-100 flex-shrink-0"
        />
        <div className="flex flex-col min-w-0 justify-center">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {currentUserData.firstname} {currentUserData.lastname || ""}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-tight">
            {currentUserData.headline || "LinkedIn Member"}
          </p>
        </div>
      </div>

      {/* View Profile Action Button */}
      <div className="px-4 pb-3">
        <button
          onClick={() => navigate("/profile")}
          className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs py-1.5 px-3 rounded-full transition-colors cursor-pointer text-center"
        >
          View Profile
        </button>
      </div>

      {/* Account Section */}
      <div className="border-t border-gray-100 flex flex-col py-1.5">
        <h4 className="text-[11px] font-bold text-gray-800 px-4 py-1">Account</h4>
        <button
          onClick={() => navigate("/profile")}
          className="text-left text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-4 py-1.5 transition-colors cursor-pointer"
        >
          Settings & Privacy
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-left text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-4 py-1.5 transition-colors cursor-pointer"
        >
          Help & Support
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-left text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-4 py-1.5 transition-colors cursor-pointer"
        >
          Language settings
        </button>
      </div>

      {/* Manage Section */}
      <div className="border-t border-gray-100 flex flex-col py-1.5">
        <h4 className="text-[11px] font-bold text-gray-800 px-4 py-1">Manage</h4>
        <button
          onClick={() => navigate("/profile")}
          className="text-left text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-gray-50 px-4 py-1.5 transition-colors cursor-pointer"
        >
          Posts & Activity
        </button>
      </div>

      {/* Sign Out Button */}
      <div className="border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full text-left text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50/50 px-4 py-3 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default PopUpCard;
