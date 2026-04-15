import User from "../models/user.models.js";

/** @type {import('../models/user.model')} */

export const updateProfileService = async (req) => {
  try {
    // const userData = User.findByIdAndUpdate({});
    const userId = req.userId;
    const dataToUpdate = req.body;
    console.log(dataToUpdate);
    const updatedUserData = await User.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
      runValidators: true,
    });
    return updatedUserData;
  } catch (error) {
    console.log(error);
  }
};
