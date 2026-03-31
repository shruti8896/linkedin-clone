import express from "express";
import { login } from "../controllers/auth.controllers.js";
import { register, logout } from "../controllers/auth.controllers.js";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", register);
authRouter.post("/logout", logout);

export default authRouter;
