import uploadOnCloudniary from "../config/cloudinary.js";
import postModel from "../models/post.model.js";
import { ceratePostService } from "../services/post.service.js";

export const createPost = async (req, res) => {
  try {
    if (req.description) {
      const postCreationResponse = ceratePostService(req);
    }
    return res.status(201).json({ message: postCreationResponse });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong " });
  }
};
