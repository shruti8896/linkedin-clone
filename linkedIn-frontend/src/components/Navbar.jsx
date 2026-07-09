import React, { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import navLogo from "../assets/Navbarlogo.png";
import { FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import NavItem from "./NavItem";
import { FaUserGroup } from "react-icons/fa6";
import PopUpCard from "./PopUpCard";
import ProfileImage from "../assets/profile-picture.png";

const Navbar = () => {
  const { currentUserData } = useUserContext();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  function handleShowPopup() {
    setShowPopup((prev) => !prev);
  }

  return (
    <div className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="relative flex lg:w-[70%] justify-between mx-auto items-center">
        <img
          src={navLogo}
          alt="logo"
          className="h-10 m-2"
          onClick={() => navigate("/home")}
        />

        <div className="flex md:border h-10 my-auto gap-2 p-3 rounded-2xl">
          <FaSearch className="my-auto" />
          <input
            type="text"
            placeholder="search"
            className="md:w-60 w-0 focus:w-16 focus:outline-none p-2"
          />
        </div>

        <div className="flex gap-2 md:gap-8 items-center">
          <NavItem
            path={"/home"}
            icon={<IoHomeSharp size={28} />}
            label="Home"
          />

          <NavItem
            path={"/connectionrequests"}
            icon={<FaUserGroup size={28} />}
            label="Network"
          />

          <NavItem path={"/jobs"} icon={<MdWork size={28} />} label="Jobs" />

          <NavItem
            path={"/messages"}
            icon={<AiFillMessage size={28} />}
            label="Messages"
          />

          <NavItem
            path={"/notifications"}
            icon={<IoNotifications size={28} />}
            label="Notifications"
          />
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={handleShowPopup} className="hidden md:block">
            <img
              src={currentUserData.profilePic || ProfileImage}
              alt="profile"
              className="h-12 w-12 rounded-full cursor-pointer border"
            />
          </button>

          {showPopup && <PopUpCard />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
