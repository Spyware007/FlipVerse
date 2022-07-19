import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
	getAllUsers,
	createUser,
	loginUser,
	logoutUserFromAllDevices,
	logoutUser,
} from "../controllers/userAuth.js";

const userAuthRouter = express.Router();

// Authentication Routes
userAuthRouter.route("/api/user").post(getAllUsers);
userAuthRouter.route("/api/user/signup").post(createUser);
userAuthRouter.route("/api/user/login").post(loginUser);
userAuthRouter.route("/api/user/logout").post(authMiddleware, logoutUser);
userAuthRouter
	.route("/api/user/logout/all")
	.post(authMiddleware, logoutUserFromAllDevices);

export default userAuthRouter;
