import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import ActionButton from "./ActionButton";
import { useProfileContext } from "../contexts/ProfileContext";
import { updateUserProfile } from "../services/profileService";
import { useUserContext } from "../contexts/UserContext";

function EditProfile() {
  const { setEditProfile } = useProfileContext();
  const { currentUserData, setCurrentUserData } = useUserContext();

  // 🔥 handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // for experience fields
    if (name.startsWith("exp.")) {
      const key = name.split(".")[1];

      setCurrentUserData((prev) => ({
        ...prev,
        experience: {
          ...prev.experience,
          [key]: value,
        },
      }));
    } else {
      setCurrentUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //transform skill from array to string or vv

  function getSkillData(skills) {
    if (Array.isArray(skills)) {
      return skills.map((s) => s.trim());
    }

    return skills.split(",").map((s) => s.trim());
  }

  // 🔥 submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(currentUserData.skills);

    // convert skills string → array
    const finalData = {
      ...currentUserData,
      skills: getSkillData(currentUserData.skills),
    };

    console.log("FINAL DATA:", finalData);

    // 👉 send to backend here

    try {
      const updatedUserInfo = await updateUserProfile(finalData);
      console.log(updatedUserInfo);
      setEditProfile(false); // close modal after success
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black/80 fixed top-0 flex justify-center items-center z-10">
      <div className="w-[70%] max-h-[90vh] bg-white mt-10 rounded-xl px-4 overflow-y-auto flex flex-col pb-2">
        <div className="flex justify-between border-b">
          <h2 className="text-2xl p-2">Edit Bio</h2>
          <ActionButton
            icon={<RxCross1 size={23} className="mt-4" />}
            onClick={() => setEditProfile(false)}
          />
        </div>

        <hr className="text-gray-200 mb-4" />
        <p className="text-xs text-gray-700 mb-4">* Indicates required</p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <h4 className="text-xl font-semibold mb-1">Basic Info</h4>

          <label className="labelCSS">First Name*</label>
          <input
            name="firstname"
            disabled={true}
            value={currentUserData.firstname}
            className="inputCSS"
          />

          <label className="labelCSS">Last Name*</label>
          <input
            name="lastname"
            disabled={true}
            value={currentUserData.lastname}
            className="inputCSS"
          />

          <label className="labelCSS">Username</label>
          <input
            name="username"
            value={currentUserData.username}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Email</label>
          <input
            name="email"
            disabled={true}
            value={currentUserData.email}
            className="inputCSS"
          />

          <label className="labelCSS">Headline</label>
          <input
            name="headline"
            value={currentUserData.headline}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Bio</label>
          <input
            name="bio"
            value={currentUserData.bio}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Contact</label>
          <input
            name="contact"
            value={currentUserData.contact}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Location</label>
          <input
            name="location"
            value={currentUserData.location}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Skills (comma separated)</label>
          <textarea
            name="skills"
            value={currentUserData.skills}
            onChange={handleChange}
            className="inputCSS"
          />

          {/* EXPERIENCE */}
          <h4 className="text-xl font-semibold mb-1 mt-4">Experience</h4>

          <label className="labelCSS">Company</label>
          <input
            name="exp.company"
            value={currentUserData.experience[0]?.company}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Role</label>
          <input
            name="exp.role"
            value={currentUserData.experience[0]?.role}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Description</label>
          <input
            name="exp.description"
            value={currentUserData.experience[0]?.description}
            onChange={handleChange}
            className="inputCSS"
          />

          <div className="flex justify-end border-t border-gray-300 ">
            <button
              type="submit"
              className="bg-blue-500 px-3 py-1 my-3 rounded-2xl text-white font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
