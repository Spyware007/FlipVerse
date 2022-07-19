import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createUser, loginUser, logoutUser } from "../controllers/userAuth.js";

const userRouter = express.Router();

userRouter.route("/api/user/signup").post(createUser);
userRouter.route("/api/user/login").post(loginUser);
userRouter.route("/api/user/logout").post(authMiddleware, logoutUser);

export default userRouter;
