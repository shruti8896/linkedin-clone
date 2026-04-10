import React from "react";
import profileImage from "../../assets/shruti_dixit.png";
import { BiSolidVideos } from "react-icons/bi";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { PiArticleNyTimesFill } from "react-icons/pi";

function CreatePost() {
  return (
    <div className="flex-col h-28 mb-3  bg-white rounded-xl p-2 shadow-xl">
      <div className="flex gap-3 ">
        <div className="h-12 w-12 rounded-full  ">
          <img src={profileImage} alt="" className="h-12 w-12 rounded-full " />
        </div>
        <input
          type="text"
          className="w-full rounded-2xl ring-1 h-10 mt-1 p-2"
          placeholder="Start a post"
        />
      </div>
      <div className="w-90% flex gap-10 justify-around mt-5">
        <div className="flex gap-2">
          {" "}
          <BiSolidVideos size={24} color="green" />
          <button className="">Video</button>
        </div>
        <div className="flex gap-2">
          {" "}
          <MdPhotoSizeSelectActual size={24} color="blue" />
          <button className="">Photo</button>
        </div>
        <div className="flex gap-2">
          {" "}
          <PiArticleNyTimesFill size={24} color="red" />
          <button className="">Article</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
