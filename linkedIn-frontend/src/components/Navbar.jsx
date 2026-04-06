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

const Navbar = () => {
  const { setCurrentUserAccessToken, logout } = useUserContext();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const resp = await logoutUser();
      console.log(resp);
      //  clear frontend state
      setCurrentUserAccessToken(null);
      logout(null);

      // redirect immediately
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-full min-h-12 bg-white mb-2">
      {" "}
      <div className="flex justify-around">
        {" "}
        <img src={navLogo} alt="logo" className="h-10 m-2 " />{" "}
        <div className="flex border h-10 my-auto gap-2 p-3 rounded-2xl ">
          {" "}
          <FaSearch className="my-auto" />{" "}
          <input
            type="text"
            placeholder="search"
            className="md:w-60 w-20 focus:outline-none p-2"
          />{" "}
        </div>{" "}
        <div className="flex gap-2 md:gap-8 px-2 items-center">
          {" "}
          <NavItem
            path={"/home"}
            icon={<IoHomeSharp size={28}  />}
            label="Home"
          />
          <NavItem
            path={"/"}
            icon={<BsPeopleFill size={28}  />}
            label="Network"
          />
          <NavItem
            path={""}
            icon={<MdWork size={28}  />}
            label="Jobs"
          />
          <NavItem
            path={"/"}
            icon={<AiFillMessage size={28}  />}
            label="Messages"
          />
          <NavItem
            path={"/"}
            icon={<IoNotifications size={28} />}
            label="Notifications"
          />
        </div>{" "}
        <button
          className="px-3 py-1 m-2 bg-blue-500 rounded-xl text-amber-50 "
          onClick={handleLogout}
        >
          {" "}
          Logout{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};

export default Navbar;
