import express from "express";
import sellerAuthMiddleware from "../middleware/sellerAuth.js";
import {
	getSellerProfile,
	updateSellerProfile,
} from "../controllers/seller.js";
const sellerRouter = express.Router();

sellerRouter
	.route("/api/seller/profile")
	.get(sellerAuthMiddleware, getSellerProfile)
	.put(sellerAuthMiddleware, updateSellerProfile);

export default sellerRouter;
