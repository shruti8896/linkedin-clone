import User from "../models/user.models.js";

export const getCurrentUserService = async (userId) => {
  try {
    console.log(userId);
    const currentUser = await User.findById(userId).select("-password");
    console.log(currentUser);
    if (!currentUser) {
      throw new Error("user does not found!!");
    }
    return currentUser;
  } catch (error) {
    throw error;
  }
};
