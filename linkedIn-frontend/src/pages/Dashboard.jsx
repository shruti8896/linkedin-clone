import React from "react";
import { useUserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { currentUserData, loading } = useUserContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-[#ececda]">
        Welcome to the page{" "}
        {currentUserData
          ? currentUserData?.data?.user?.username
          : "Something is wrong"}
        {console.log(currentUserData)}
      </div>
      ;
    </>
  );
}

export default Dashboard;
