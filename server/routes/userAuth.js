import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
	getAllUsers,
	createUser,
	loginUser,
	logoutUserFromAllDevices,
	logoutUser,
} from "../controllers/userAuth.js";

const userRouter = express.Router();

userRouter.route("/api/user").post(getAllUsers);
userRouter.route("/api/user/signup").post(createUser);
userRouter.route("/api/user/login").post(loginUser);
userRouter.route("/api/user/logout").post(authMiddleware, logoutUser);
userRouter
	.route("/api/user/logout/all")
	.post(authMiddleware, logoutUserFromAllDevices);

export default userRouter;
