import React, { useEffect, useState } from "react";
import profileImage from "../assets/profile-picture.png";
import { MdModeEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useUserContext } from "../contexts/UserContext";
import { getPosts } from "../services/postService";
import { getTimeAgo, handleEdit } from "../utils/helperFunctions";
import { useProfileContext } from "../contexts/ProfileContext";
import EditProfile from "../components/EditProfile";
import Navbar from "../components/Navbar";

function Profile() {
  const { currentUserData } = useUserContext();
  const [userPosts, setUserPosts] = useState(null);
  const [loadingUserPosts, setLoadingUserPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postsPage, setPostsPage] = useState(1);
  const { setEditProfile, editProfile } = useProfileContext();

  useEffect(() => {
    async function fetchUserPosts() {
      if (!currentUserData?._id) return;

      try {
        if (loadingUserPosts || !hasMorePosts) {
          return;
        }
        setLoadingUserPosts(true);
        const userPostsData = await getPosts(
          currentUserData._id,
          postsPage,
          10
        );
        
        setUserPosts((prev) => {
          if (!prev) {
            return userPostsData;
          }
          return {
            ...prev,
            posts: [...prev.posts, ...userPostsData.posts],
          };
        });
        setHasMorePosts(userPostsData.hasMorePosts);
        setPostsPage((prev) => prev + 1);
      } catch (error) {
        console.error("Error in fetching user posts:", error);
      } finally {
        setLoadingUserPosts(false);
      }
    }

    fetchUserPosts();
  }, [currentUserData, postsPage]);

  if (!currentUserData) {
    return (
      <div className="w-full min-h-screen bg-[#f4f2ee]">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f2ee] pb-12">
      <Navbar />
      
      {editProfile && <EditProfile />}

      <div className="max-w-4xl mx-auto px-4 mt-6 flex flex-col gap-5">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* Cover Photo */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-700">
            {currentUserData.coverPic && (
              <img
                src={currentUserData.coverPic}
                alt="cover"
                className="h-full w-full object-cover"
              />
            )}
            <button 
              onClick={() => handleEdit(setEditProfile)}
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md text-gray-700 transition cursor-pointer"
            >
              <MdModeEdit size={16} />
            </button>
          </div>

          {/* Profile Details Container */}
          <div className="relative px-6 pb-6 pt-16">
            {/* Avatar Photo */}
            <div className="absolute -top-16 left-6 w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm">
              <img
                src={currentUserData.profilePic || profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Edit Button */}
            <button
              className="absolute right-6 top-4 flex items-center gap-1 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-50 font-bold text-xs transition cursor-pointer"
              onClick={() => handleEdit(setEditProfile)}
            >
              <MdModeEdit size={12} />
              <span>Edit profile</span>
            </button>

            {/* User Meta text */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">
                {currentUserData.firstname} {currentUserData.lastname || ""}
              </h1>
              <p className="text-[13px] text-gray-700 mt-1 max-w-2xl leading-normal">
                {currentUserData.headline || "LinkedIn Member"}
              </p>
              
              <div className="flex items-center gap-4 mt-3.5 text-xs text-gray-500 font-medium">
                {currentUserData.location && (
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{currentUserData.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 hover:text-blue-600 hover:underline cursor-pointer">
                  <HiUsers className="text-gray-400" size={14} />
                  <span>{currentUserData.connections?.length || 0} connections</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex gap-2.5 mt-5">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-1.5 px-4 rounded-full transition-colors cursor-pointer shadow-xs">
                  Open to work
                </button>
                <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold text-xs py-1.5 px-4 rounded-full transition-colors cursor-pointer">
                  Share profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-800">About</h2>
            <button 
              onClick={() => handleEdit(setEditProfile)}
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition cursor-pointer"
            >
              <MdModeEdit size={14} />
            </button>
          </div>

          <p className="text-[12.5px] text-gray-700 leading-relaxed whitespace-pre-line">
            {currentUserData.bio ||
              "Write a short summary about your professional background, skills, and aspirations."}
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Skills</h2>
            <button 
              onClick={() => handleEdit(setEditProfile)}
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition cursor-pointer"
            >
              <MdModeEdit size={14} />
            </button>
          </div>

          {currentUserData.skills && currentUserData.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {currentUserData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">No skills listed yet.</p>
          )}
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-sm font-semibold text-gray-800">Experience</h2>
            <button 
              onClick={() => handleEdit(setEditProfile)}
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition cursor-pointer"
            >
              <MdModeEdit size={14} />
            </button>
          </div>

          {currentUserData.experience && currentUserData.experience.length > 0 ? (
            <div className="flex flex-col gap-6">
              {currentUserData.experience.map((exp, idx) => (
                <div key={exp._id || idx} className="flex gap-4 items-start relative">
                  {/* Left Timeline Indicator */}
                  <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-600 text-xs">
                    {exp.company?.substring(0, 2).toUpperCase() || "WP"}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="font-semibold text-xs text-gray-900">{exp.role}</h3>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">{exp.company}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Jan 2024 - Present</p>
                    {exp.description && (
                      <p className="text-[11.5px] text-gray-700 leading-relaxed mt-2 max-w-2xl break-words">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">No experience entries yet.</p>
          )}
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Activity</h2>
            <button className="text-blue-600 hover:text-blue-800 font-semibold text-xs cursor-pointer">
              View all posts
            </button>
          </div>

          {userPosts?.posts && userPosts.posts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {userPosts.posts.slice(0, 2).map((item, index) => (
                <div key={item._id || index} className="border border-gray-200 rounded-xl p-4 flex flex-col bg-white">
                  <div className="flex gap-2.5 items-center">
                    <img
                      src={currentUserData.profilePic || profileImage}
                      className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      alt="avatar"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-gray-900 truncate">
                        {currentUserData.firstname} {currentUserData.lastname || ""}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {getTimeAgo(item.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-700 leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-4 text-center">
              No recent activity posts.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;
