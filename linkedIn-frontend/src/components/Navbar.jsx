import React, { useState, useEffect, useRef } from "react";
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
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleShowPopup() {
    setShowPopup((prev) => !prev);
  }

  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-200/80 shadow-xs h-[52px] flex items-center">
      <div className="max-w-6xl w-full mx-auto px-4 flex justify-between items-center h-full relative">
        
        {/* Left Side: Logo & Search */}
        <div className="flex items-center flex-1 max-w-sm">
          <img
            src={navLogo}
            alt="LinkedIn Logo"
            className="h-[34px] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate("/home")}
          />

          <div className="flex-1 max-w-[280px] ml-2.5 h-8.5 bg-[#edf3f8] hover:bg-[#eef3f8] rounded flex items-center px-3 border border-transparent focus-within:border-black/70 focus-within:bg-white transition-all duration-150">
            <FaSearch size={12} className="text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-500 pl-2 focus:ring-0"
            />
          </div>
        </div>

        {/* Right Side: Links & Profile Dropdown */}
        <div className="flex items-center gap-4 md:gap-7 h-full">
          <NavItem
            path={"/home"}
            icon={<IoHomeSharp size={20} />}
            label="Home"
          />

          <NavItem
            path={"/connectionrequests"}
            icon={<FaUserGroup size={20} />}
            label="My Network"
          />

          <NavItem 
            path={"/jobs"} 
            icon={<MdWork size={20} />} 
            label="Jobs" 
          />

          <NavItem
            path={"/messages"}
            icon={<AiFillMessage size={20} />}
            label="Messaging"
          />

          <NavItem
            path={"/notifications"}
            icon={<IoNotifications size={20} />}
            label="Notifications"
          />

          {/* Profile Dropdown Tab */}
          {currentUserData && (
            <div className="relative h-full" ref={dropdownRef}>
              <button 
                onClick={handleShowPopup} 
                className="flex flex-col items-center justify-between h-full py-1.5 px-2 hover:text-gray-900 text-gray-500 transition-colors duration-150 cursor-pointer border-b-2 border-transparent select-none focus:outline-none"
              >
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={currentUserData.profilePic || ProfileImage}
                    alt="Me"
                    className="h-5 w-5 rounded-full object-cover border border-gray-200"
                  />
                </div>
                <span className="text-[10px] text-center tracking-wide hidden md:flex items-center gap-0.5 mt-0.5">
                  Me <span className="text-[7px]">▼</span>
                </span>
              </button>

              {showPopup && <PopUpCard />}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
