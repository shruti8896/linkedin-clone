import axios from "axios";

export const getCurrentUser = async (params) => {
  const userData = await axios.get(
    "http://localhost:8080/api/user/currentuser",
    {
      withCredentials: true,
    },
  );
  return userData;
};
