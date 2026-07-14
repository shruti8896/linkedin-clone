import uploadOnCloudniary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import { createNotificationService } from "./notification.service.js";

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

    const populatedPost = await Post.findById(newPost._id).populate(
      "author",
      "firstname lastname username profilePic headline",
    );

    return populatedPost;
  } catch (error) {
    console.log("error in saving post");
    throw error;
  }
};

export const getPostsService = async (req) => {
  const { userId } = req.params;
  try {
    console.log(req);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const posts = await Post.find({ author: userId })
      .populate("author")
      .populate("comments.user", "firstname lastname username profilePic headline")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments({
      author: userId,
    });

    return {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      hasMorePosts: page * limit < totalPosts,
    };
  } catch (error) {
    console.log("Error in fetching all posts from database");
    throw error;
  }
};
export const getAllPostsService = async (req) => {
  try {
    console.log(req);
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const allPosts = await Post.find()
      .populate("author")
      .populate("comments.user", "firstname lastname username profilePic headline")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    return {
      allPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      hasMore: page * limit < totalPosts,
    };
  } catch (error) {
    console.log("Error in fetching all posts from database");
    throw error;
  }
};

export const likePostService = async (postId, userId) => {
  console.log(postId);
  console.log(userId);
  try {
    let post = await Post.findById(postId);
    console.log(post);
    if (!post) {
      throw new Error("No post found with this post ID");
    }

    if (post.likes.includes(userId)) {
      console.log("Post found");
      post.likes = post.likes.filter((id) => id != userId);
    } else {
      post.likes.push(userId);
      // Trigger notification
      await createNotificationService({
        recipient: post.author,
        sender: userId,
        type: "like",
        post: post._id,
        message: "liked your post.",
      }).catch(err => console.error("Failed to trigger like notification: ", err));
    }
    return post.save();
  } catch (error) {
    throw error;
  }
};

export const commentPostService = async (postId, userId, comment) => {
  try {
    console.log(comment);
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { comment, user: userId } },
      },
      { new: true },
    ).populate("comments.user", "firstname lastname profilePic headline");
    console.log(post);
    if (!post) {
      throw new Error(
        "No such post found with the post id to add comments in it",
      );
    }
    // Trigger notification
    await createNotificationService({
      recipient: post.author,
      sender: userId,
      type: "comment",
      post: post._id,
      message: `commented: "${comment}"`,
    }).catch(err => console.error("Failed to trigger comment notification: ", err));
    return post;
  } catch (error) {
    throw error;
  }
};
