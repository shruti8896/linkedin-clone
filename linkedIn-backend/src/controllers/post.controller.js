import uploadOnCloudniary from "../config/cloudinary.js";
import postModel from "../models/post.model.js";
import {
  createPostService,
  getAllPostsService,
} from "../services/post.service.js";

export const createPost = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.body.description) {
      return res.status(401).json({ message: "no post data" });
    }

    const postCreationResponse = createPostService(req);
    return res.status(201).json({ message: postCreationResponse });
  } catch (error) {
    console.log("CREATE POST ERROR:", error);
    return res.status(500).json({ message: "something went wrong " });
  }
};

export const getPosts = async (req, res) => {
  try {
    const allPosts = await getAllPostsService();
    return res.status(200).json({ message: "All posts found", allPosts });
  } catch (error) {
    return res.status(500).json({ message: "getPost Error" });
  }
};
