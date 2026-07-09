import React from "react";
import profileImage from "../assets/profile-picture.png";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import { logoutUser } from "../services/authServices";
import NavItem from "./NavItem";
import { FaUserGroup } from "react-icons/fa6";

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
      console.log(err);
    }
  }

  return (
    <div className="absolute top-full right-0 mt-3 z-999 w-72 rounded-xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex flex-col items-center p-5">
        <img
          src={currentUserData.profilePic || profileImage}
          alt="profile"
          className="h-20 w-20 rounded-full object-cover border"
        />

        <h2 className="mt-3 text-lg font-semibold">
          {currentUserData?.username}
        </h2>

        <button
          onClick={() => navigate("/profile")}
          className="mt-4 w-full rounded-full border border-blue-600 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
        >
          View Profile
        </button>

        {/* <hr className="my-4 w-full" />

        <div className="w-full">
          <NavItem
            path={"/"}
            icon={<FaUserGroup size={22} />}
            label="Network"
          />
        </div> */}

        <hr className="my-4 w-full" />

        <button
          onClick={handleLogout}
          className="w-full rounded-lg border border-red-500 py-2 font-medium text-red-500 transition hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default PopUpCard;
