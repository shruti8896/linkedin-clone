import React from "react";
import profileImage from "../../assets/profile-picture.png";
import { BiSolidVideo } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { RiArticleLine } from "react-icons/ri";
import { useUserContext } from "../../contexts/UserContext";

function CreatePost({ openPopup }) {
  const { currentUserData } = useUserContext();

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
      {/* Top Input Row */}
      <div className="flex gap-2.5 items-center w-full">
        <img
          src={currentUserData?.profilePic || profileImage}
          alt="Avatar"
          className="h-11 w-11 rounded-full object-cover border border-gray-200"
        />
        <button
          onClick={openPopup}
          className="flex-1 rounded-full border border-gray-300 bg-white hover:bg-gray-100/80 text-gray-500 font-semibold text-left text-xs py-3 px-4 transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Start a post...
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="flex justify-between items-center px-1.5 pt-1.5 border-t border-gray-100 w-full">
        {/* Photo Button */}
        <button
          onClick={openPopup}
          className="flex items-center gap-2 hover:bg-gray-100 p-2.5 rounded-lg cursor-pointer transition-colors"
        >
          <BsImage size={18} className="text-[#378fe9]" />
          <span className="text-xs font-semibold text-gray-500">Media</span>
        </button>

        {/* Video Button */}
        <button
          onClick={openPopup}
          className="flex items-center gap-2 hover:bg-gray-100 p-2.5 rounded-lg cursor-pointer transition-colors"
        >
          <BiSolidVideo size={18} className="text-[#5f9b41]" />
          <span className="text-xs font-semibold text-gray-500">Video</span>
        </button>

        {/* Article Button */}
        <button
          onClick={openPopup}
          className="flex items-center gap-2 hover:bg-gray-100 p-2.5 rounded-lg cursor-pointer transition-colors"
        >
          <RiArticleLine size={18} className="text-[#e06847]" />
          <span className="text-xs font-semibold text-gray-500">Write article</span>
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
