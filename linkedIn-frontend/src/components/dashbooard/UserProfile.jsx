import React from "react";
import profileImage from "../../assets/shruti_dixit.png";
import { useUserContext } from "../../contexts/UserContext";
import { FaCamera } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { useNavigate } from "react-router";

function UserProfile() {
  const navigate = useNavigate();
  const { currentUserData, loading } = useUserContext();
  if (loading) return <div>Loading...</div>;
  return (
    <div className=" flex min-h-60 bg-white rounded-xl p-2 shadow-xl relative ">
      <div className="w-full h-20 rounded bg-gray-500 overflow-hidden ">
        <img src="" alt="" className="w-full" />
        <FaCamera className=" m-2 text-slate-300 absolute right-2" size={16} />
      </div>

      <button
        onClick={navigate("/user")}
        className="w-16 h-16 rounded-full overflow-hidden mt-12 ml-2 absolute  border-white border-2"
      >
        <img src={profileImage} alt="profile-image" className="rounded-full" />
        <GoPlusCircle size={20} className="" />
      </button>
      <div className="absolute mt-30 ml-2">
        <h1 className="text-xl ">
          {" "}
          {currentUserData
            ? currentUserData.data.user.username
            : "Something is wrong"}
        </h1>
        <p className="text-xs">
          Ex Product Engineer| Co-founder @Substring technologies
        </p>
        <p className="text-xs text-gray-500">Varanasi, Uttar Pradesh</p>
      </div>
    </div>
  );
}

export default UserProfile;
