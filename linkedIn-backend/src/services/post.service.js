import uploadOnCloudniary from "../config/cloudinary.js";
import Post from "../models/post.model.js";

export const createPostService = async (req) => {
  try {
    let { description } = req.body;
    let newPost;
    if (req.file) {
      let image = await uploadOnCloudniary(req.file.path);
      newPost = await Post.create({
        description,
        author: req.userId,
        image,
      });
    } else {
      newPost = await Post.create({
        description,
        author: req.userId,
      });
    }
  } catch (error) {
    console.log("error in saving post");
    throw error;
  }
};

export const getAllPostsService = async (req) => {
  try {
    const allPosts = await Post.find().populate("author");
    return allPosts;
  } catch (error) {
    console.log("Error in fetching all posts from database");
    throw error;
  }
};
