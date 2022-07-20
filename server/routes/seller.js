import express from "express";
import sellerAuthMiddleware from "../middleware/sellerAuth.js";
import {
	getSellerProfile,
	createProduct,
	updateSellerProfile,
	uploadProductImage,
	deleteProduct,
	getProduct,
} from "../controllers/seller.js";
const sellerRouter = express.Router();
import multer from "multer";

const upload = multer({
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|png|jpeg|PNG)$/)) {
			return cb(new Error("Please upload valid image format"));
		}
		return cb(undefined, true);
	},
	limits: {
		fileSize: 1000000,
	},
});

sellerRouter
	.route("/api/seller/profile")
	.get(sellerAuthMiddleware, getSellerProfile)
	.put(sellerAuthMiddleware, updateSellerProfile);

// Product routes
sellerRouter.route("/api/product").post(sellerAuthMiddleware, createProduct);

sellerRouter
	.route("/api/product/:id")
	.get(getProduct)
	.put(upload.single("image"), sellerAuthMiddleware, uploadProductImage)
	.delete(sellerAuthMiddleware, deleteProduct);

export default sellerRouter;
