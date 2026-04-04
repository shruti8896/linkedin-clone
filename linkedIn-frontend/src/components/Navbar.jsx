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
    <div className="w-full h-12 bg-white ">
      <div className="flex justify-around">
        <img src={navLogo} alt="" className="h-10 m-2 " />{" "}
        <div className="flex border h-10 my-auto gap-2 p-3 rounded-2xl ">
          <FaSearch className="my-auto" />{" "}
          <input type="text" placeholder="search" className="w-60" />
        </div>
       <div className="flex gap-7  my-auto"> <IoHomeSharp  size={30}/>
        <BsPeopleFill size={30}/>
        <MdWork size={30} />
        <AiFillMessage size={30} />
        <IoNotifications size={30} /></div>
        <button
          className="px-3 py-1  m-2 bg-blue-500 rounded-xl text-amber-50 "
          onClick={handleLogout}
        >
          Logout
        </button>{" "}
      </div>
    </div>
  );
};

export default Navbar;
