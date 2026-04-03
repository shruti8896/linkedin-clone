import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import { loginUser } from "../services/authServices";
import toast from "react-hot-toast";
import { useUserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showButton, setShowButton] = useState(false);
  const { login, setCurrentUserAccessToken } = useUserContext();

  function handleLogin(e) {
    const { name, value } = e.target;
    setErr("");
    setLoginData((prev) => {
      const updateddata = { ...prev, [name]: value };

      return updateddata;
    });
  }
  async function sendLoginData(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(loginData);

      console.log(response);
      if (response?.data) {
        //store the accesstoken in local storage
        const accessToken = response.data.accessToken;
        // console.log(accessToken);
        const user = response.data.user;
        try {
          // console.log("Before login:", user);
          setCurrentUserAccessToken(accessToken);
          login(user);

          // console.log("After login success");
        } catch (e) {
          console.error("Login function error:", e);
        }
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error?.response?.status === 401) {
        const msg = error.response.data?.message || "Login failed";
        setErr(msg);
        toast.error(msg);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-[white] flex flex-col justify-center items-center">
      <div className="p-4 lg:p-7 w-full">
        <img src={logo} alt="" className="w-30" />
      </div>
      <form
        className="w-[90%] max-w-100 h-100 md:shadow-xl flex flex-col justify-center px-4 gap-3"
        onSubmit={sendLoginData}
      >
        <h1 className="text-gray-800 text-[30px] font-semibold mb-6">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={loginData.email}
          onChange={(e) => handleLogin(e)}
          required
          className="w-full h-12 border-2 rounded-md focus:outline outline-blue-500 border-gray-600 text-gray-800 text-[18px] px-5 py-2.5  "
        />
        <div className="w-full h-12 focus-within:outline focus-within:outline-blue-500 border-gray-600 border-2 rounded-md  text-gray-800 flex">
          <input
            type={showButton ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={(e) => handleLogin(e)}
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <p
          className="text-center cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account?{" "}
          <span className="mr-3 font-semibold text-blue-500 ">Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
