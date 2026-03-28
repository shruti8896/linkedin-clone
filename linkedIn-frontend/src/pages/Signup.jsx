import React from "react";
import logo from "../assets/logo.svg";

const Signup = () => {
  return (
    <div className="w-full h-screen bg-[white]">
      <div className="p-[30px] lg:[35px]">
        <img src={logo} alt="" />
      </div>
      <form className="w-[90%] max-w-[400px] h-[600px] shadow-xl"></form>
    </div>
  );
};

export default Signup;
