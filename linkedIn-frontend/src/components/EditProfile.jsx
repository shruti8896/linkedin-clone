import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import ActionButton from "./ActionButton";
import { useProfileContext } from "../contexts/ProfileContext";
function EditProfile() {
  const { setEditProfile } = useProfileContext();

  return (
    <div className="w-full min-h-screen bg-black/80 fixed  top-0 flex justify-center items-center z-10">
      <div className="w-[70%] h-screen bg-white mt-10 rounded-xl px-4  overflow-y-auto flex flex-col pb-2">
        <div className="flex justify-between border-b ">
          <h2 className="text-2xl p-2 ">Edit Bio</h2>
          <ActionButton
            icon={<RxCross1 size={23} className="mt-4" />}
            onClick={() => setEditProfile(false)}
          />
        </div>
        <hr className="text-gray-200 mb-4" />
        <p className="text-xs text-gray-700 mb-4">* Indicates required </p>

        <div className="flex-1 overflow-y-auto flex flex-col">
            <h4 className=" text-xl font-semibold mb-1">Basic Info</h4>
        <label className="labelCSS" htmlFor="">
          First Name*
        </label>
        <input className="inputCSS" type="text" />
        <label className="labelCSS" htmlFor="">
          Last Name*
        </label>
        <input className="inputCSS" type="text" />
        <label className="labelCSS" htmlFor="">
          Email
        </label>
        <input className="inputCSS" type="text" />
        <label className="labelCSS" htmlFor="">
          Bio
        </label>
        <input className="inputCSS" type="text" />
        <label className="labelCSS" htmlFor="">
          Contact
        </label>
        <input className="inputCSS" type="text" />
        <label className="labelCSS" htmlFor="">
          Username
        </label>
        <input className="inputCSS" type="text" />

        <label className="labelCSS" htmlFor="">
          Skills
        </label>
        <textarea name="skills" id=""></textarea></div>
        <hr className="text-gray-400 mb-4" />

        <div className="w-full right-0 m-2 flex justify-end ">
          <button className="  bg-blue-500 px-3 py-1  rounded-2xl text-white text-md font-semibold">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
