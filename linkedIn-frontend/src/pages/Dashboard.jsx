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
      <main className="w-full mx-auto bg-[#ececda]">
        <Navbar />
        {createPost && (
          <CreatePostPopup closePopup={() => setCreatePost(false)} />
        )}
        {editProfile && <EditProfile />}
        <div className="  lg:w-[70%]  mx-4 lg:mx-auto my-4 items-start flex flex-col lg:flex-row gap-4">
          <div className="flex-[2.5] w-full lg:w-auto lg:sticky top-20 lg:self-start  ">
            <UserProfile
              coverImageCss={`h-22`}
              profileImageCSS={`w-16 h-16 overflow-hidden mt-1`}
              divCSS={`-mt-10 -ml-1`}
              bioCSS={`absolute mt-30 ml-2`}
            />
            <TryPremium />
          </div>
          <div className="flex-5 w-full ">
            <CreatePost openPopup={() => setCreatePost(true)} />

            <Feed />
          </div>
          <div className="flex-[2.5] w-full lg:w-auto  lg:sticky lg:top-20  lg:self-start">
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
