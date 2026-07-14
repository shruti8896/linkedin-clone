import React, { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";
import UserProfile from "../components/dashbooard/UserProfile";
import Feed from "../components/dashbooard/Feed";
import LinkedinNews from "../components/dashbooard/LinkedinNews";
import TryPremium from "../components/dashbooard/TryPremium";
import CreatePost from "../components/dashbooard/CreatePost";
import EditProfile from "../components/EditProfile";
import { useProfileContext } from "../contexts/ProfileContext";
import profileImage from "../assets/profile-picture.png";
import CreatePostPopup from "../components/CreatePostPopup";

function Dashboard() {
  const { editProfile, setEditProfile } = useProfileContext();
  const { currentUserData, loading } = useUserContext();
  const [createPost, setCreatePost] = useState(false);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (currentUserData) {
    return (
      <main className="w-full min-h-screen bg-[#f4f2ee]">
        <Navbar />
        {createPost && (
          <CreatePostPopup closePopup={() => setCreatePost(false)} />
        )}
        {editProfile && <EditProfile />}
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column */}
          <div className="w-full lg:w-[225px] flex-shrink-0 flex flex-col gap-3 lg:sticky lg:top-20">
            <UserProfile
              coverImageCss={`h-16`}
              profileImageCSS={`w-16 h-16`}
              divCSS={``}
              bioCSS={``}
            />
            <TryPremium />
          </div>

          {/* Middle Column: Feed */}
          <div className="flex-1 w-full flex flex-col gap-4">
            <CreatePost openPopup={() => setCreatePost(true)} />
            <Feed />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[315px] flex-shrink-0 lg:sticky lg:top-20">
            <LinkedinNews />
          </div>
        </div>
      </main>
    );
  } else {
    return <div>No user found</div>;
  }
}

export default Dashboard;
