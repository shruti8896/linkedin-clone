import React from "react";
import { useUserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";
import UserProfile from "../components/dashbooard/UserProfile";
import Feed from "../components/dashbooard/Feed";
import LinkedinNews from "../components/dashbooard/LinkedinNews";
import TryPremium from "../components/dashbooard/TryPremium";
import CreatePost from "../components/dashbooard/CreatePost";

function Dashboard() {
  const { currentUserData, loading } = useUserContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (currentUserData && currentUserData.data) {
    return (
      <main className="w-full mx-auto bg-[#ececda]">
        <Navbar />
        <div className=" h-screen lg:w-[70%] mx-4 lg:mx-auto my-4 flex flex-col lg:flex-row gap-4">
          <div className="flex-[2.5]">
            <UserProfile />
            <TryPremium />
          </div>
          <div className="flex-5">
            <CreatePost />
            <Feed />
          </div>
          <div className="flex-[2.5]">
            <LinkedinNews />
          </div>
        </div>
        ;
      </main>
    );
  }
}

export default Dashboard;
