import React from "react";
import profileImage from "../assets/profile-picture.png";
import coverImage from "../assets/logo.svg"; // use any placeholder
import { MdModeEdit } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { useUserContext } from "../contexts/UserContext";
import { useEffect } from "react";
import { getPosts } from "../services/postService";
import { useState } from "react";
import { getTimeAgo, handleEdit } from "../utils/helperFunctions";
import { useProfileContext } from "../contexts/ProfileContext";
import EditProfile from "../components/EditProfile";
import Navbar from "../components/Navbar";

function Profile() {
  const { currentUserData } = useUserContext();
  const [userPosts, setUserPosts] = useState(null);
  const [loadingUserPosts, setLoadingUserPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false); // next pages
  const [postsPage, setPostsPage] = useState(1);
  const { setEditProfile, editProfile } = useProfileContext();
  // console.log(currentUserData);
  useEffect(() => {
    async function fetchUserPosts() {
      if (!currentUserData?._id) return;

      try {
        if (loadingUserPosts || !hasMorePosts) {
          return;
        }
        setLoadingUserPosts(true);
        setLoadingMorePosts(true);
        console.log("getting all Posts info...........");
        const userPostsData = await getPosts(
          currentUserData._id,
          postsPage,
          10,
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log(userPostsData);
        console.log(userPosts);
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
        console.log("erorr in fetching all posts");
        console.log(error);
      } finally {
        setLoadingUserPosts(false);
        setLoadingMorePosts(false);
      }
    }

    fetchUserPosts();
  }, [currentUserData, postsPage]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-6 space-y-5">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Cover */}
          <div className="relative h-56 bg-gray-300">
            <img
              src={currentUserData.coverPic}
              alt="cover"
              className="h-full w-full object-cover"
            />

            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100">
              <MdModeEdit size={20} />
            </button>
          </div>

          {editProfile && <EditProfile />}

          {/* Profile */}
          <div className="relative px-8 pb-6">
            <img
              src={currentUserData.profilePic}
              alt="profile"
              className="h-36 w-36 rounded-full border-4 border-white absolute -top-20 bg-white"
            />

            <button
              className="absolute right-8 top-5 flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition"
              onClick={() => handleEdit(setEditProfile)}
            >
              <MdModeEdit />
              Edit Profile
            </button>

            <div className="pt-20">
              <h1 className="text-3xl font-bold">
                {currentUserData.firstname}
              </h1>

              <p className="text-gray-700 mt-1">{currentUserData.headline}</p>

              <div className="flex items-center gap-6 mt-3 text-gray-500">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  {currentUserData.location}
                </div>

                <div className="flex items-center gap-2">
                  <HiUsers />
                  {currentUserData.connections.length}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                  Open to Work
                </button>

                <button className="border border-gray-400 px-6 py-2 rounded-full hover:bg-gray-100">
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">About</h2>
            <MdModeEdit className="cursor-pointer" />
          </div>

          <p className="text-gray-700 leading-7">
            {currentUserData.bio ||
              `Passionate Full Stack Developer with experience building scalable MERN
          applications. I enjoy solving real-world problems and creating
          intuitive user experiences.`}
          </p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <MdModeEdit className="cursor-pointer" />
          </div>

          <div className="flex flex-wrap gap-3">
            {currentUserData.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Experience</h2>
            <MdModeEdit className="cursor-pointer" />
          </div>

          {currentUserData.experience.map((exp, key) => (
            <div className="border-l-2 border-blue-600 pl-6 relative">
              <div className="absolute h-4 w-4 rounded-full bg-blue-600 -left-[9px] top-1"></div>

              <h3 className="font-semibold text-lg">{exp.role}</h3>

              <p className="text-gray-600">{exp.company}</p>

              <p className="text-gray-500 text-sm mb-3">Jan 2024 - Present</p>

              <p className="text-gray-700">
                {exp.description ||
                  `Building scalable MERN applications, REST APIs, authentication
              systems and real-time features.`}
              </p>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Activity</h2>

            <button className="text-blue-600 font-medium">
              View All Posts
            </button>
          </div>

          <div className="space-y-4">
            {userPosts?.posts?.map((item, index) => (
              <div key={index} className="border rounded-xl p-4">
                <div className="flex gap-3 items-center">
                  <img
                    src={currentUserData.profilePic}
                    className="h-12 w-12 rounded-full"
                    alt=""
                  />

                  <div>
                    <h4 className="font-semibold">{item.firstname}</h4>

                    <p className="text-sm text-gray-500">
                      {getTimeAgo(item.createdAt)}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
