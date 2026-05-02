import uploadOnCloudniary from "../config/cloudinary.js";
import User from "../models/user.models.js";

/** @type {import('../models/user.model')} */

export const updateProfileService = async (req) => {
  try {
    // const userData = User.findByIdAndUpdate({});
    const allowedUpdates = [
      "firstname",
      "lastname",
      "username",
      "email",
      "headline",
      "bio",
      "contact",
      "location",
      "skills",
      "experience",
    ];

    const dataToUpdate = {};

    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) {
        dataToUpdate[key] = req.body[key];
      }
    });
    const userId = req.userId;
    if (dataToUpdate.experience) {
      try {
        dataToUpdate.experience = JSON.parse(dataToUpdate.experience);
      } catch {
        throw new Error("Invalid experience format");
      }
    }
    if (dataToUpdate.skills) {
      try {
        dataToUpdate.skills = JSON.parse(dataToUpdate.skills);
      } catch {
        throw new Error("Invalid skills format");
      }
    }

    let profilePic;
    let coverPic;

    if (req.files?.profilePic) {
      profilePic = await uploadOnCloudniary(req.files.profilePic[0].path);
      dataToUpdate.profilePic = profilePic;
    }
    if (req.files?.coverPic) {
      coverPic = await uploadOnCloudniary(req.files.coverPic[0].path);
      dataToUpdate.coverPic = coverPic;
    }
    console.log("FINAL UPDATE DATA:", dataToUpdate);
    const updatedUserData = await User.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
      runValidators: true,
    }).select("-password");
    return updatedUserData;
  } catch (error) {
    console.error("Update profile error:", error);
    console.log(error);
    throw error;
  }
};
