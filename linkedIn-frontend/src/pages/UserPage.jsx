import React from "react";
import UserProfile from "../components/dashbooard/UserProfile";
import Navbar from "../components/Navbar";
import LinkedinNews from "../components/dashbooard/LinkedinNews";

function UserPage() {
  return (
    <>
      <main className="w-full mx-auto bg-[#ececda]">
        <Navbar />
        <div className="  h-screen lg:w-[70%] mx-4 lg:mx-auto my-4 ">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="lg:w-[75%]">
              <UserProfile  coverImageCss={`h-48`}
              profileImageCSS={`w-48 h-48 -mt-10 overflow-hidden`}
              divCSS={`-mt-20 -ml-1`}
              bioCSS={`absolute ml-9`}/>
            </div>
            <div className="lg:w-[25%]">
              <LinkedinNews />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserPage;
