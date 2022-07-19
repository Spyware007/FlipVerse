import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createUser } from "../controllers/userAuth.js";

const userRouter = express.Router();

userRouter.route("/api/user").post(createUser);

export default userRouter;
