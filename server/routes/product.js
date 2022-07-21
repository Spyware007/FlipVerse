import express from "express";
import {
	addProductToWishList,
	purchaseProduct,
	removeProductFromWishList,
	getWishListedProducts,
	getPurchasedProducts,
} from "../controllers/product.js";
import userAuthMiddleware from "../middleware/userAuth.js";

const productRouter = express.Router();

productRouter
	.route("/api/user/wishlist")
	.get(userAuthMiddleware, getWishListedProducts);

productRouter
	.route("/api/user/purchased")
	.get(userAuthMiddleware, getPurchasedProducts);

productRouter
	.route("/api/product/wishlist/:id")
	.post(userAuthMiddleware, addProductToWishList)
	.delete(userAuthMiddleware, removeProductFromWishList);

productRouter
	.route("/api/product/purchase/:id")
	.post(userAuthMiddleware, purchaseProduct);
// .delete(userAuthMiddleware, removeProductFromWishList);

export default productRouter;
