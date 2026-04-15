import axios from "axios";

export const updateUserProfile = async (formdata) => {
  try {
    const updatedInfo = await axios.put(
      "http://localhost:8080/api/user/currentuser/updateProfile",
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
