import express from "express";
import {
  commentPosts,
  createPost,
  getAllPosts,
  getPosts,
  likePosts,
} from "../controllers/post.controller.js";
import { getCurrentUserToken } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

export const postRoutes = express.Router();

postRoutes.post(
  "/createPost",
  getCurrentUserToken,
  upload.single("imageFile"),
  createPost,
);

postRoutes.get("/getAllPosts", getCurrentUserToken, getAllPosts);
postRoutes.get("/getPosts/:userId", getCurrentUserToken, getPosts);
postRoutes.get("/likePost/:id", getCurrentUserToken, likePosts);
postRoutes.post("/commentPost/:id", getCurrentUserToken, commentPosts);
