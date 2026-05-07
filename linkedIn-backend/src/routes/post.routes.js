import express from "express";
import { createPost } from "../controllers/post.controller";
import { getCurrentUserToken } from "../middlewares/auth.middleware";
import upload from "../middlewares/multer";

const postRouter = express.Router();

postRouter.post(
  "/cerate",
  getCurrentUserToken,
  upload.single("images"),
  createPost,
);
