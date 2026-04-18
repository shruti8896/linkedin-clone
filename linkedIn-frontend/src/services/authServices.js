import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
let url = SERVER_URL + "/api/auth/signup";
console.log(url);

export const signUpUser = async (userData) => {
  let result = await axios.post(
    "http://localhost:8080/api/auth/signup",
    userData,
    {
      withCredentials: true,
    },
  );

  return result.data;
};

export const loginUser = async (userData) => {
  let result = await axios.post(
    "http://localhost:8080/api/auth/login",
    userData,
    {
      withCredentials: true,
    },
  );
  console.log(result.data);

  return result.data;
};

export const logoutUser = async (userData) => {
  let result = await axios.post(
    "http://localhost:8080/api/auth/logout",
    userData,
    {
      withCredentials: true,
    },
  );

  return result;
};
