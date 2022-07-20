import express from "express";
import userAuthMiddleware from "../../middleware/userAuth.js";
import {
	getAllUsers,
	createUser,
	loginUser,
	logoutUserFromAllDevices,
	logoutUser,
} from "../../controllers/AuthControllers/userAuth.js";

const userAuthRouter = express.Router();

// Authentication Routes
userAuthRouter.route("/api/user").post(getAllUsers);

userAuthRouter.route("/api/user/signup").post(createUser);
userAuthRouter.route("/api/user/login").post(loginUser);
userAuthRouter.route("/api/user/logout").post(userAuthMiddleware, logoutUser);
userAuthRouter
	.route("/api/user/logout/all")
	.post(userAuthMiddleware, logoutUserFromAllDevices);

export default userAuthRouter;
