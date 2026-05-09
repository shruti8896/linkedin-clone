import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
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
