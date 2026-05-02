import express from "express";
import { getCurrentUserToken } from "../middlewares/auth.middleware.js";
import { updateUserProfile } from "../controllers/profile.controllers.js";
import upload from "../middlewares/multer.js";
export const profileRoutes = express.Router();

profileRoutes.put(
  "/updateProfile",
  getCurrentUserToken,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  updateUserProfile,
);
