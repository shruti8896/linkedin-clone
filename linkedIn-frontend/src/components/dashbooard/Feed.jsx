import React from "react";
import UserProfile from "./UserProfile";
import { RxCross2 } from "react-icons/rx";
import profileImage from "../../assets/profile-picture.png";
import { GoPlusCircle } from "react-icons/go";
import navbarLogo from "../../assets/Navbarlogo.png";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import NavItem from "../NavItem";

function Feed() {
  return (
    <div className="flex-5 min-h-72 bg-white rounded-xl p-2 shadow-xl">
      <div className="flex gap-3 ">
        <div className="h-24 w-24 rounded-full mt-1 ">
          <img src={profileImage} alt="" />
        </div>
        <div className="flex flex-col mt-1  ">
          <h1 className="md ">Vedanti N.</h1>
          <p className="text-sm -mt-1">
            Immediate Joiner | 5⭐@Hackerank | 250+ DSA Problem solved
          </p>
          <p className="text-sm -mt-1">5d</p>
        </div>
        <div className="flex gap-1 mt-1 mx-2">
          <GoPlusCircle className="mt-1 text-blue-500" />
          <p className="text-blue-500">Follow</p>
        </div>
      </div>

      {/* post */}

      <div className="flex flex-col gap-3">
        <p className="text-sm m-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
          delectus distinctio quod eius error culpa deleniti pariatur inventore,
          ullam natus, atque cumque obcaecati nisi quam enim incidunt vitae.
          Magni et labore corrupti optio odio vero aliquam quas delectus, dicta,
          quasi repudiandae facilis dolore itaque perferendis iste odit. Magnam,
          nam dolorum.
        </p>
        <img src={navbarLogo} alt="" className="h-80 w-80" />
        <hr />
        <div className="flex gap-2 justify-around my-1">
          <NavItem icon={<AiOutlineLike size={20} />} label={"Like"} />
          <NavItem icon={<FaCommentDots size={20} />} label={"Comment"} />
          <NavItem icon={<BiRepost size={20} />} label={"Repost"} />
          <NavItem icon={<BsSendFill size={20} />} label={"Send"} />
        </div>
      </div>
    </div>
  );
}

export default Feed;
