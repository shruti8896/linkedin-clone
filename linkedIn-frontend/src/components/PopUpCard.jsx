import React from "react";
import profileImage from "../assets/profile-picture.png";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import { logoutUser } from "../services/authServices";
import NavItem from "./NavItem";
import { FaUserGroup } from "react-icons/fa6";

function PopUpCard() {
  const navigate = useNavigate();
  const { currentUserData, loading, setCurrentUserAccessToken, logout } =
    useUserContext();
  async function handleLogout() {
    try {
      const resp = await logoutUser();
      console.log(resp);
      //  clear frontend state
      setCurrentUserAccessToken(null);
      logout();

      // redirect immediately
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="absolute top-full right-1 mt-1 z-50">
      <div className="relative  md:w-72  w-44 p-2 flex flex-col gap-2 justify-center border items-center bg-gray-300/80 rounded-xl shadow-lg">
        {/* Arrow */}
        <img
          src={profileImage}
          alt="profile-Image"
          className="h-16 w-16 flex-1"
        />
        <h2 className="text-2xl font-semibold text-blue-600">
          {" "}
          {currentUserData
            ? currentUserData.data.user.username
            : "Something is wrong"}
        </h2>
        <button className="px-3 py-1 m-2 w-full  ring-2 ring-blue-500 rounded-2xl text-black">
          View Profile
        </button>
        <NavItem path={"/"} icon={<FaUserGroup size={28} />} label="Network" />
        <button
          className="px-3 py-1 m-2 ring-2 w-full ring-red-500 rounded-xl text-black "
          onClick={handleLogout}
        >
          {" "}
          Logout{" "}
        </button>{" "}
      </div>
    </div>
  );
}

export default PopUpCard;
