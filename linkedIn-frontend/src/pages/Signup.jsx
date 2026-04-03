import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router";
import { signUpUser } from "../services/authServices";
import toast from "react-hot-toast";
import { useUserContext } from "../contexts/UserContext";

const Signup = () => {
  // const { serverURL } = useAuthContext();

  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login, setCurrentUserAccessToken } = useUserContext();

  function handleSignUp(e) {
    const { name, value } = e.target;
    setErr("");
    setSignUpData((prev) => {
      const updateddata = { ...prev, [name]: value };

      return updateddata;
    });
  }

  async function sendSignupData(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signUpUser(signUpData);
      // console.log(data);
      if (data?.data) {
        console.log("entered block");
        setLoading(false);

        const user = data.data.user;
        const accessToken = data.data.accessToken;
        console.log(accessToken);
        console.log(user);
        try {
          console.log("Before login:", user);
          setCurrentUserAccessToken(accessToken);

          login(user);

          console.log("After login success");
        } catch (e) {
          console.error("Login function error:", e);
        }
        console.log("saving user done");
        navigate("/dashboard");
        //store the access token in local storage
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);

      if (error.response.status === 403) {
        // alert(error.response.data.message);
        setErr(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  }
  return (
    <div className="w-full  bg-[white] flex flex-col justify-center items-center">
      <div className="p-4 lg:p-7 w-full">
        <img src={logo} alt="" className="w-30" />
      </div>
      <form
        className="w-[90%] max-w-100 h-150 md:shadow-xl flex flex-col justify-center px-4 gap-3"
        onSubmit={sendSignupData}
      >
        <h1 className="text-gray-800 text-[30px] font-semibold mb-6">
          Sign Up
        </h1>
        <input
          type="text"
          name="firstname"
          placeholder="Firstname"
          value={signUpData.firstname}
          onChange={(e) => handleSignUp(e)}
          required
          className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500  border-gray-600 text-gray-800 text-[18px]  px-5 py-2.5 "
        />
        <input
          type="text"
          placeholder="Lastname"
          name="lastname"
          value={signUpData.lastname}
          onChange={(e) => handleSignUp(e)}
          required
          className="w-full h-12 border-2 rounded-md  focus:outline outline-blue-500 border-gray-600 text-gray-800 text-[18px] px-5 py-2.5  "
        />
        <input
          type="text"
          placeholder="UserName"
          name="username"
          value={signUpData.username}
          onChange={(e) => handleSignUp(e)}
          required
          className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500 border-gray-600 text-gray-800 text-[18px] px-5 py-2.5  "
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={signUpData.email}
          onChange={(e) => handleSignUp(e)}
          required
          className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500 border-gray-600 text-gray-800 text-[18px] px-5 py-2.5  "
        />
        <div className="w-full h-12 focus-within:outline focus-within:outline-blue-500 border-gray-600 border-2 rounded-md  text-gray-800 flex">
          <input
            type={showButton ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={signUpData.password}
            onChange={(e) => handleSignUp(e)}
            required
            className="w-full text-[18px] focus:outline-none text-gray-800  px-5 py-2.5 "
          />
          <button
            type="button"
            onClick={() => setShowButton(!showButton)}
            className="mr-3 font-semibold text-blue-500 "
          >
            {showButton ? "Hide" : "Show?"}
          </button>
        </div>
        {err && <p className="text-red-400 text-sm">{err}</p>}

        <button
          disabled={loading}
          className="w-full rounded-4xl bg-blue-600 p-3 text-slate-50 mt-5"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p
          className="text-center cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account?{" "}
          <span className="mr-3 font-semibold text-blue-500 ">Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
