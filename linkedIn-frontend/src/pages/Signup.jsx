import React from "react";
import logo from "../assets/logo.svg";

const Signup = () => {
  return (
    <div className="w-full  bg-[white] flex flex-col justify-center items-center">
      <div className="p-4 lg:p-7 w-full">
        <img src={logo} alt="" className="w-30" />
      </div>
      <form className="w-[90%] max-w-100 h-150 md:shadow-xl flex flex-col justify-center px-4 gap-3">
        <h1 className="text-gray-800 text-[30px] font-semibold mb-6">Sign Up</h1>
        <input
          type="text"
          placeholder="Firstname"
          required
          className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500  border-gray-600 text-gray-800 text-[18px]  px-5 py-2.5 "
        />
        <input
          type="text"
          placeholder="Lastname"
          required
          className="w-full h-12 border-2 rounded-md  focus:outline outline-blue-500 border-gray-600 text-gray-800 text-[18px] px-5 py-2.5  "
        />
        <input
          type="text"
          placeholder="userName"
          required
          className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500 border-gray-600 text-gray-800 text-[18px] px-5 py-2.5  "
        />
        <input
          type="email"
          placeholder="email"
          required
          className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500 border-gray-600 text-gray-800 text-[18px] px-5 py-2.5  "
        />
        <div className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500 border-gray-600 text-gray-800 "> 
          <input
          type="password"
          placeholder="password"
          required
          className="w-full text-[18px] text-gray-800  px-5 py-2.5 "
        />
        <button>show</button>
        </div>

        <button className="w-full rounded-4xl bg-blue-600 p-3 text-slate-50 mt-5">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
