import express from "express";
import sellerAuthMiddleware from "../middleware/sellerAuth.js";
import {
	getSellerProfile,
	createProduct,
	updateSellerProfile,
	deleteProduct,
	getProduct,
} from "../controllers/seller.js";
const sellerRouter = express.Router();

sellerRouter
	.route("/api/seller/profile")
	.get(sellerAuthMiddleware, getSellerProfile)
	.put(sellerAuthMiddleware, updateSellerProfile);

sellerRouter.route("/api/product").post(sellerAuthMiddleware, createProduct);

sellerRouter
	.route("/api/product/delete/:id")
	.get(getProduct)
	.delete(sellerAuthMiddleware, deleteProduct);
export default sellerRouter;
