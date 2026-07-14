import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useProfileContext } from "../contexts/ProfileContext";
import { updateUserProfile } from "../services/profileService";
import { useUserContext } from "../contexts/UserContext";
import { FaCamera } from "react-icons/fa";
import profilePhoto from "../assets/shruti_dixit.png";
import toast from "react-hot-toast";

function EditProfile() {
  const { currentUserData, setCurrentUserData } = useUserContext();
  const { setEditProfile } = useProfileContext();
  const [updating, setUpdating] = useState(false);
  const profilePicRef = useRef();
  const coverPicRef = useRef();

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

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
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

  // Convert comma separated string to skills array
  function getSkillData(skills) {
    if (Array.isArray(skills)) {
      return skills.map((s) => s.trim());
    }
    if (typeof skills === "string") {
      return skills.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }

  function handleProfilePicChange(e) {
    let file = e.target.files[0];
    if (file) {
      setCurrentUserData((prev) => ({
        ...prev,
        profilePicURL: URL.createObjectURL(file),
        profilePic: file,
      }));
    }
  }

  function handleCoverPicChange(e) {
    let file = e.target.files[0];
    if (file) {
      setCurrentUserData((prev) => ({
        ...prev,
        coverPicURL: URL.createObjectURL(file),
        coverPic: file,
      }));
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const formData = new FormData();

      allowedFields.forEach((key) => {
        if (currentUserData[key] !== undefined) {
          formData.append(key, currentUserData[key]);
        }
      });

      if (profilePicRef.current?.files?.[0]) {
        formData.append("profilePic", profilePicRef.current.files[0]);
      }

      if (coverPicRef.current?.files?.[0]) {
        formData.append("coverPic", coverPicRef.current.files[0]);
      }

      if (currentUserData.skills) {
        const skillsArray = getSkillData(currentUserData.skills);
        formData.set("skills", JSON.stringify(skillsArray));
      }

      if (currentUserData.experience) {
        formData.set("experience", JSON.stringify(currentUserData.experience));
      }

      const updatedUserInfo = await updateUserProfile(formData);
      setCurrentUserData((prev) => ({ ...prev, ...updatedUserInfo.message }));
      toast.success("Profile updated successfully!");
      setEditProfile(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error("Failed to update profile info");
    } finally {
      setUpdating(false);
    }
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setEditProfile(false);
    }
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className="w-full h-full bg-black/50 backdrop-blur-xs fixed inset-0 flex justify-center items-center z-50 p-4"
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Hidden File Upload Inputs */}
        <input
          type="file"
          name="profilePic"
          hidden
          accept="image/*"
          ref={profilePicRef}
          onChange={handleProfilePicChange}
        />
        <input
          type="file"
          name="coverPic"
          hidden
          accept="image/*"
          ref={coverPicRef}
          onChange={handleCoverPicChange}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-base font-semibold text-gray-800">Edit intro</h2>
          <button
            onClick={() => setEditProfile(false)}
            className="p-1.5 hover:bg-gray-150 text-gray-500 hover:text-gray-800 rounded-full transition-colors cursor-pointer"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        {/* Modal Main Body (Scrollable Form) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          
          {/* Banner Images Section */}
          <div className="relative">
            {/* Cover Picture */}
            <div 
              onClick={() => coverPicRef.current.click()}
              className="w-full h-28 bg-gradient-to-r from-blue-600 to-indigo-700 relative rounded-lg overflow-hidden cursor-pointer group"
            >
              {(currentUserData.coverPicURL || currentUserData.coverPic) && (
                <img
                  src={currentUserData.coverPicURL || currentUserData.coverPic}
                  alt="Cover Background"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                <div className="bg-black/50 p-2 rounded-full text-white scale-90 group-hover:scale-100 transition-transform">
                  <FaCamera size={14} />
                </div>
              </div>
            </div>

            {/* Profile Picture */}
            <div 
              onClick={() => profilePicRef.current.click()}
              className="absolute -bottom-8 left-6 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md cursor-pointer group"
            >
              <img
                src={
                  currentUserData.profilePicURL ||
                  currentUserData.profilePic ||
                  profilePhoto
                }
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <FaCamera size={12} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Spacer to push inputs below avatar */}
          <div className="h-6"></div>

          {/* Form Fields: Grid Layout */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1.5">
              Basic Demographics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">First Name*</label>
                <input
                  name="firstname"
                  disabled
                  value={currentUserData.firstname || ""}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-400 cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Last Name*</label>
                <input
                  name="lastname"
                  disabled
                  value={currentUserData.lastname || ""}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Username</label>
                <input
                  name="username"
                  value={currentUserData.username || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                <input
                  name="email"
                  disabled
                  value={currentUserData.email || ""}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Headline</label>
              <input
                name="headline"
                value={currentUserData.headline || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                placeholder="e.g. Fullstack Engineer @ Google"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                <input
                  name="location"
                  value={currentUserData.location || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Phone</label>
                <input
                  name="contact"
                  type="number"
                  value={currentUserData.contact || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Bio / Summary</label>
              <textarea
                name="bio"
                value={currentUserData.bio || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white min-h-[70px] resize-y"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Skills (comma separated)</label>
              <textarea
                name="skills"
                value={
                  Array.isArray(currentUserData.skills)
                    ? currentUserData.skills.join(", ")
                    : currentUserData.skills || ""
                }
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white min-h-[50px] resize-y"
                placeholder="React, Node.js, Mongoose"
              />
            </div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1.5 pt-2">
              Work History
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Company</label>
                <input
                  name="exp.company"
                  value={currentUserData.experience?.[0]?.company || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Role / Title</label>
                <input
                  name="exp.role"
                  value={currentUserData.experience?.[0]?.role || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Work Description</label>
              <textarea
                name="exp.description"
                value={currentUserData.experience?.[0]?.description || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white min-h-[60px] resize-y"
              />
            </div>
          </div>
        </form>

        {/* Modal Footer (Sticky Bottom Action Bar) */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setEditProfile(false)}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-full transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-semibold text-xs py-2 px-5 rounded-full shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {updating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditProfile;
