import axios from "axios";

export const getCurrentUser = async () => {
  try {
    const userData = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/currentuser`,
      {
        withCredentials: true,
      },
    );
    // console.log(userData);
    return userData.data.user;
  } catch (error) {
    if (error?.status === 401) {
      console.log(error.status);
      return null; //
    }
    throw error;
  }
};
