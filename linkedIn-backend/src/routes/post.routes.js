import express from "express";
import {
  commentPosts,
  createPost,
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

postRoutes.get("/getPosts", getCurrentUserToken, getPosts);
postRoutes.get("/likePost/:id", getCurrentUserToken, likePosts);
postRoutes.post("/commentPost/:id", getCurrentUserToken, commentPosts);
