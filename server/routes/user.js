import express from "express";
import { createUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/user", createUser);

export default userRouter;
