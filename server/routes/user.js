import express from "express";
import userAuthMiddleware from "../middleware/userAuth.js";
import {
	getUserProfile,
	updateUserProfile,
	uploadUserImage,
} from "../controllers/user.js";
const userRouter = express.Router();
import multer from "multer";

const upload = multer({
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|jpeg|jfif|PNG)$/)) {
			return cb(new Error("Please upload valid image format"));
		}
		return cb(undefined, true);
	},
	limits: {
		fileSize: 1000000,
	},
});

userRouter
	.route("/api/user/profile")
	.get(userAuthMiddleware, getUserProfile)
	.put(userAuthMiddleware, updateUserProfile);

userRouter
	.route("/api/user/profile/image")
	.post(upload.single("image"), userAuthMiddleware, uploadUserImage);
export default userRouter;
