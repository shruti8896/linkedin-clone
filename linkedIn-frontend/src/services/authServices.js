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

  return result;
};
