import axios from "axios";

export const updateUserProfile = async (formdata) => {
  try {
    const updatedInfo = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/currentuser/updateProfile`,
      formdata,
      {
        withCredentials: true,
      },
    );
    return updatedInfo.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response?.data || error.message;
  }
};
