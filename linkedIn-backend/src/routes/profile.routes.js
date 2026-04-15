import express from "express";
import { getCurrentUserToken } from "../middlewares/auth.middleware.js";
import { updateUserProfile } from "../controllers/profile.controllers.js";
export const profileRoutes = express.Router();

profileRoutes.put("/updateProfile", getCurrentUserToken, updateUserProfile);