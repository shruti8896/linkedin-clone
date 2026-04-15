import React from "react";
import profileImage from "../../assets/shruti_dixit.png";
import { useUserContext } from "../../contexts/UserContext";
import { FaCamera } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { useNavigate } from "react-router";
import { MdModeEdit } from "react-icons/md";
import { useProfileContext } from "../../contexts/ProfileContext";

function UserProfile({ coverImageCss, profileImageCSS, bioCSS, divCSS }) {
  const { setEditProfile, editProfile } = useProfileContext();
  const navigate = useNavigate();

  function handleEdit() {
    // alert("Working on it");
    setEditProfile(true);
  }
  const { currentUserData, loading } = useUserContext();

  if (loading) return <div>Loading...</div>;
  return (
    <div className="w-full bg-white rounded-xl shadow-xl overflow-visible ">
      {/* Cover Image */}
      <div className={`w-full ${coverImageCss} bg-gray-500 relative`}>
        <FaCamera
          className="m-2 text-slate-300 absolute right-2 top-2"
          size={16}
        />
      </div>

      {/* Profile + Bio Section */}
      <div className="px-4 pb-4">
        {/* Profile Image */}
        <div className={` mb-2 ${divCSS}`}>
          <button
            className={`rounded-full ${profileImageCSS} border-2 z-10 relative border-white`}
          >
            <img src={profileImage} alt="" className="rounded-full" />
          </button>
        </div>

        {/* Bio */}
        <div className=" flex ">
          <div className="">
            <h1 className="text-xl">
              {currentUserData
                ? currentUserData.data.user.username
                : "Something is wrong"}
            </h1>
            <p className="text-xs">
              {currentUserData
                ? currentUserData.data.user.headline
                : "Something is wrong"}
            </p>
            <p className="text-xs text-gray-500">
              {currentUserData
                ? currentUserData.data.user.location
                : "Something is wrong"}
            </p>
          </div>
          <MdModeEdit size={28} onClick={handleEdit} />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
