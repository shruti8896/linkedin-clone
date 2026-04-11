import React from "react";
import UserProfile from "../components/dashbooard/UserProfile";
import Navbar from "../components/Navbar";
import LinkedinNews from "../components/dashbooard/LinkedinNews";

function UserPage() {
  return (
    <>
      <main className="w-full mx-auto bg-[#ececda]">
        <Navbar />
        <div className="  h-screen lg:w-[70%] mx-4 lg:mx-auto my-4 flex flex-col lg:flex-row gap-4">
          <div className="w-full flex gap-2">
            <div className="w-[75%]">
              <UserProfile />
            </div>
            <div className="w-[25%]">
              <LinkedinNews />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserPage;
