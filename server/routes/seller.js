import express from "express";
import sellerAuthMiddleware from "../middleware/sellerAuth.js";
import {
	getSellerProfile,
	createProduct,
	updateSellerProfile,
	uploadProductImage,
	deleteProduct,
	getSellerProducts,
	getProduct,
} from "../controllers/seller.js";
const sellerRouter = express.Router();
import multer from "multer";
import { getProductsReadyForSale } from "../controllers/product.js";

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
// const upload = multer();

sellerRouter
	.route("/api/seller/profile")
	.get(sellerAuthMiddleware, getSellerProfile)
	.put(sellerAuthMiddleware, updateSellerProfile);

// Product routes
sellerRouter
	.route("/api/product")
	.get(sellerAuthMiddleware, getSellerProducts)
	.post(upload.any(), sellerAuthMiddleware, createProduct);

sellerRouter
	.route("/api/product/:id")
	.get(getProduct)
	.put(upload.single("image"), sellerAuthMiddleware, uploadProductImage)
	.delete(sellerAuthMiddleware, deleteProduct);

sellerRouter
	.route("/api/products/ready")
	.get(sellerAuthMiddleware, getProductsReadyForSale);

export default sellerRouter;
