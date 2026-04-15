import { updateProfileService } from "../services/profile.services.js";

export const updateUserProfile = async (req, res) => {
  try {
    const updatedData = await updateProfileService(req);
    console.log(updatedData);
    res.status(200).json({ message: updatedData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "update failed!!", error: error });
  }
};
