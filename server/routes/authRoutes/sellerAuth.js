import express from "express";
import sellerMiddleware from "../../middleware/sellerAuth.js";
import {
	getAllSellers,
	createSeller,
	loginSeller,
	logoutSellerFromAllDevices,
	logoutSeller,
} from "../../controllers/AuthControllers/sellerAuth.js";

const sellerAuthRouter = express.Router();

// Authentication Routes
sellerAuthRouter.route("/api/seller").get(getAllSellers);
sellerAuthRouter.route("/api/seller/signup").post(createSeller);
sellerAuthRouter.route("/api/seller/login").post(loginSeller);
sellerAuthRouter
	.route("/api/seller/logout")
	.post(sellerMiddleware, logoutSeller);
sellerAuthRouter
	.route("/api/seller/logout/all")
	.post(sellerMiddleware, logoutSellerFromAllDevices);

export default sellerAuthRouter;
