import React from "react";
import { useUserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { currentUserData, loading } = useUserContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (currentUserData && currentUserData.data) {
    return (
      <>
        <Navbar />
        <div className="w-full h-screen bg-[#ececda]">
          Welcome to the page{" "}
          {currentUserData
            ? currentUserData.data.user.username
            : "Something is wrong"}
        </div>
        ;
      </>
    );
  }
}

export default Dashboard;