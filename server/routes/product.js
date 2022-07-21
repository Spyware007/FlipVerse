import express from "express";
import {
	addProductToWishList,
	removeProductFromWishList,
} from "../controllers/product.js";
import userAuthMiddleware from "../middleware/userAuth.js";

const productRouter = express.Router();

productRouter
	.route("/api/product/wishlist/:id")
	.post(userAuthMiddleware, addProductToWishList)
	.delete(userAuthMiddleware, removeProductFromWishList);

export default productRouter;
