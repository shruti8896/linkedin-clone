import React from "react";
import profileImage from "../../assets/shruti_dixit.png";
import { useUserContext } from "../../contexts/UserContext";

function UserProfile() {
  const { currentUserData, loading } = useUserContext();
  return (
    <div className="flex h-60 bg-white rounded-xl p-2 shadow-xl relative ">
      <div className="w-full h-20 rounded bg-gray-500 overflow-hidden ">
        <img src="" alt="" className="w-full" />
      </div>

      <div className="w-16 h-w-16 rounded-full absolute top-16 left-5 ">
        <img src={profileImage} alt="profile-image" className="rounded-full" />
      </div>
      <div className="absolute top-32">
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
