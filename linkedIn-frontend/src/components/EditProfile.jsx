import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import ActionButton from "./ActionButton";
import { useProfileContext } from "../contexts/ProfileContext";
import { updateUserProfile } from "../services/profileService";
import { useUserContext } from "../contexts/UserContext";
import UserProfile from "./dashbooard/UserProfile";
import { FaCamera } from "react-icons/fa";
import profilePhoto from "../assets/shruti_dixit.png";
import toast from "react-hot-toast";

function EditProfile() {
  const { currentUserData, setCurrentUserData } = useUserContext();
  const { setEditProfile, EditProfile } = useProfileContext();
  const [updating, setUpdating] = useState(false);
  const profilePic = useRef();
  const coverPic = useRef();

  const allowedFields = [
    "firstname",
    "lastname",
    "username",
    "email",
    "headline",
    "bio",
    "contact",
    "location",
  ];

  // 🔥 handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // for experience fields
    if (name.startsWith("exp.")) {
      const key = name.split(".")[1];

      setCurrentUserData((prev) => ({
        ...prev,
        experience: [
          {
            ...prev.experience?.[0],
            [key]: value,
          },
        ],
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

  function handleProfilePic(e) {
    let file = e.target.files[0];
    setCurrentUserData((prev) => ({
      ...prev,
      profilePicURL: URL.createObjectURL(file),
      profilePic: file,
    }));
  }
  function handleCoverPic(e) {
    debugger;
    let file = e.target.files[0];
    setCurrentUserData((prev) => ({
      ...prev,
      coverPicURL: URL.createObjectURL(file),
      coverPic: file,
    }));
  }

  // 🔥 submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(!updating);
    const formData = new FormData();

    // console.log(currentUserData.skills);
    allowedFields.forEach((key) => {
      if (currentUserData[key] !== undefined) {
        formData.append(key, currentUserData[key]);
      }
    });

    console.log(formData);

    if (currentUserData.profilePic) {
      formData.append("profilePic", profilePic.current.files[0]);
    }

    if (currentUserData.coverPic) {
      formData.append("coverPic", coverPic.current.files[0]);
    }

    if (currentUserData.skills) {
      const skillsArray = getSkillData(currentUserData.skills);
      formData.set("skills", JSON.stringify(skillsArray));
    }

    if (currentUserData.experience) {
      formData.set("experience", JSON.stringify(currentUserData.experience));
    }

    // 👉 send to backend here

    try {
      const updatedUserInfo = await updateUserProfile(formData);
      console.log(currentUserData);
      console.log(updatedUserInfo);

      setCurrentUserData((prev) => ({ ...prev, ...updatedUserInfo.message }));
      setEditProfile(false); // close modal after success
      toast.success("Data Updated successfully!!!");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setUpdating(false);
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
        {/* input file for Cover Image/profilePic */}
        <input
          type="file"
          name="profilePic"
          hidden
          accept="image/*"
          ref={profilePic}
          id=""
          onChange={handleProfilePic}
        />
        <input
          type="file"
          name="coverPic"
          hidden
          accept="image/*"
          ref={coverPic}
          id=""
          onChange={handleCoverPic}
        />
        <hr className="text-gray-200 mb-4" />
        <div
          className={`w-full h-24 bg-gray-500 relative `}
          onClick={() => coverPic.current.click()}
        >
          <img
            src={
              currentUserData.coverPicURL || currentUserData.coverPic || null
            }
            alt="coverPic"
            className="w-full h-full"
          />
          <FaCamera
            className="m-2 text-slate-300 absolute right-2 top-2"
            size={16}
          />
          <div className="h-22 w-full rounded-lg "></div>
        </div>
        <div className="px-4 pb-4">
          {/* Profile Image */}
          <div
            className={` mb-2 -mt-10 -ml-1`}
            onClick={() => profilePic.current.click()}
          >
            <button
              className={`rounded-full w-16 h-16 overflow-hidden mt-1 border-2 z-10 relative border-white`}
            >
              <img
                src={
                  currentUserData.profilePicURL ||
                  currentUserData.profilePic ||
                  profilePhoto
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
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
            value={
              Array.isArray(currentUserData.skills)
                ? currentUserData.skills.join(", ")
                : currentUserData.skills || ""
            }
            onChange={handleChange}
            className="inputCSS"
          />

          {/* EXPERIENCE */}
          <h4 className="text-xl font-semibold mb-1 mt-4">Experience</h4>

          <label className="labelCSS">Company</label>
          <input
            name="exp.company"
            value={currentUserData.experience[0]?.company || ""}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Role</label>
          <input
            name="exp.role"
            value={currentUserData.experience[0]?.role || ""}
            onChange={handleChange}
            className="inputCSS"
          />

          <label className="labelCSS">Description</label>
          <input
            name="exp.description"
            value={currentUserData.experience[0]?.description || ""}
            onChange={handleChange}
            className="inputCSS"
          />

          <div className="flex justify-end border-t border-gray-300 ">
            <button
              type="submit"
              className="bg-blue-500 px-3 py-1 my-3 rounded-2xl text-white font-semibold"
            >
              {updating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Updating...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
