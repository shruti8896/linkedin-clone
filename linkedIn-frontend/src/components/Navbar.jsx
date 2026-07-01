import React from "react";
import { logoutUser } from "../services/authServices";
import { useUserContext } from "../contexts/UserContext";
// import { logoutUser } from "../services/authServices";
import { useNavigate } from "react-router";
import navLogo from "../assets/Navbarlogo.png";
import { FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import NavItem from "./NavItem";
import { FaUserGroup } from "react-icons/fa6";
import PopUpCard from "./PopUpCard";
import ProfileImage from "../assets/profile-picture.png";
import { useState } from "react";

const Navbar = () => {
  const { setCurrentUserAccessToken, logout, currentUserData } =
    useUserContext();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  function handleShowPopup() {
    setShowPopup((currentState) => !currentState);
  }
  return (
    <div className=" min-h-12 w-full bg-white sticky top-0 ">
      {" "}
      <div className="flex lg:w-[70%] justify-between mx-auto items-center relative ">
        {" "}
        <img src={navLogo} alt="logo" className="h-10 m-2 " />{" "}
        {/* TODO: make the search bar controlled ==> API Integration , deboucing, controlled state */}
        <div className="flex md:border h-10 my-auto gap-2 p-3 rounded-2xl ">
          {" "}
          <FaSearch className="my-auto" />{" "}
          <input
            type="text"
            placeholder="search"
            className="md:w-60 w-0 focus:w-16 focus:outline-none p-2"
          />{" "}
        </div>{" "}
        <div className="flex gap-2  md:gap-8 items-center">
          <NavItem
            path={"/home"}
            icon={<IoHomeSharp size={28} />}
            label="Home"
          />
          <NavItem
            path={"/"}
            icon={<FaUserGroup size={28} />}
            label="Network"
          />
          <NavItem path={""} icon={<MdWork size={28} />} label="Jobs" />
          <NavItem
            path={"/"}
            icon={<AiFillMessage size={28} />}
            label="Messages"
          />
          <NavItem
            path={"/"}
            icon={<IoNotifications size={28} />}
            label="Notifications"
          />
        </div>{" "}
        {/* <button
          className="px-3 py-1 m-2 bg-blue-500 rounded-xl text-amber-50 "
          onClick={handleLogout}
        >
        
          {" "}
          Logout{" "}
        </button>{" "} */}
        <div className="relative">
          <button onClick={handleShowPopup} className=" md:block hidden">
            <img
              src={currentUserData.profilePic || ProfileImage}
              alt="profile-image"
              className="h-12 w-12 rounded-full cursor-pointer"
            />
          </button>
          {showPopup && (
            <div className="absolute right-0 mt-2 z-50">
              <PopUpCard />
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default Navbar;
