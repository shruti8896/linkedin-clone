import axios from "axios";

export const getCurrentUser = async () => {
  try {
    const userData = await axios.get(
      "http://localhost:8080/api/user/currentuser",
      {
        withCredentials: true,
      },
    );
    return userData;
  } catch (error) {
    if (error?.status === 401) {
      console.log(error.status);
      return null; //
    }
    throw error;
  }
};



