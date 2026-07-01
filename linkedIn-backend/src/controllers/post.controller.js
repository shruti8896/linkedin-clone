import uploadOnCloudniary from "../config/cloudinary.js";
import postModel from "../models/post.model.js";
import {
  commentPostService,
  createPostService,
  getAllPostsService,
  likePostService,
} from "../services/post.service.js";

export const createPost = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.body.description) {
      return res.status(401).json({ message: "no post data" });
    }

    const postCreationResponse = await createPostService(req);
    console.log("From controller: Post created");
    console.log(postCreationResponse);
    return res.status(201).json({ message: postCreationResponse });
  } catch (error) {
    console.log("CREATE POST ERROR:", error);
    return res.status(500).json({ message: "something went wrong " });
  }
};

export const getPosts = async (req, res) => {
  try {
    const allPosts = await getAllPostsService(req);
    return res.status(200).json({ success: true, ...allPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};

export const likePosts = async (req, res) => {
  try {
    console.log("controller ran");
    let postId = req.params.id;
    let userId = req.userId;
    const likePostResponse = await likePostService(postId, userId);

    res.status(200).json({ message: likePostResponse });
  } catch (error) {
    console.log("Error in likePosts controller");
    throw error;
  }
};

export const commentPosts = async (req, res) => {
  console.log("request recieved");
  try {
    let postId = req.params.id;
    let userId = req.userId;
    let comment = req.body.comment;
    console.log(req.body);

    console.log(comment);

    let commentResponse = await commentPostService(postId, userId, comment);
    console.log(commentResponse);
    return res.status(200).json({ post: commentResponse });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
