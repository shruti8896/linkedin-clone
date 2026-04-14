import React from "react";
import profileImage from "../../assets/shruti_dixit.png";
import { BiSolidVideos } from "react-icons/bi";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { PiArticleNyTimesFill } from "react-icons/pi";
import ActionButton from "../ActionButton";
import { AiOutlineLike } from "react-icons/ai";

function CreatePost() {
  return (
    <div className="flex-col min-h-25 mb-3  bg-white rounded-xl p-2 shadow-xl">
      <div className="flex gap-3 ">
        <div className="h-12 w-12 rounded-full  ">
          <img src={profileImage} alt="" className="h-12 w-12 rounded-full " />
        </div>
        <input
          type="text"
          className="w-full rounded-full ring-1 mt-1 px-4 py-2"
          placeholder="Start a post...."
        />
      </div>
      <div className="w-[90%] flex gap-10 justify-around mt-5">
        <ActionButton
          icon={<BiSolidVideos size={24} color="green" />}
          label={"Video"}
          onClick={() => alert("Working on it..!")}
        />
        <ActionButton
          icon={<MdPhotoSizeSelectActual size={24} color="blue" />}
          label={"Photo"}
          onClick={() => alert("Working on it..!")}
        />
        <ActionButton
          icon={<PiArticleNyTimesFill size={24} color="red" />}
          label={"Article"}
          onClick={() => alert("Working on it..!")}
        />
      </div>
    </div>
  );
}

export default CreatePost;
