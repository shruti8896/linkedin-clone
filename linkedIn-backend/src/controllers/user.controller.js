import { getCurrentUserService } from "../services/user.service.js";

export const getCurentUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(`userId : ${userId}`);
    const currentUser = await getCurrentUserService(userId);
    res.status(200).json({ user: currentUser });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "Fetching current user error", message: error.message });
  }
};
