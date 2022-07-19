import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getUserProfile, updateUserProfile } from "../controllers/user.js";
const userRouter = express.Router();

userRouter
	.route("/api/user/profile")
	.get(authMiddleware, getUserProfile)
	.put(authMiddleware, updateUserProfile);

export default userRouter;
