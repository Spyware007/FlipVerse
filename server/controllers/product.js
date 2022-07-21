import User from "../models/User.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { getIndexOfProduct, verifyId } from "../utils/helpers.js";

const addProductToWishList = asyncHandler(async (req, res) => {
	const {
		params: { id },
		user: { wishList },
	} = req;

	if (!id) {
		res.status(400);
		throw new Error("Product ID invalid");
	}

	const pId = id.toString();
	if (!verifyId(pId)) {
		res.status(400);
		throw new Error("Product ID invalid");
	}

	const productIndex = getIndexOfProduct(wishList, id);

	if (productIndex > -1) {
		res.status(400);
		throw new Error("Product is already wishlisted!");
	}

	const product = await Product.findById(pId);

	if (!product) {
		res.status(400);
		throw new Error("Product not found!");
	}

	wishList.push(id);
	await req.user.save();
	res.status(201).json({ message: "Product wishlisted successfully" });
});

const removeProductFromWishList = asyncHandler(async (req, res) => {
	const {
		params: { id },
		user: { wishList },
	} = req;

	if (!id) {
		res.status(400);
		throw new Error("Product ID invalid");
	}

	const pId = id.toString();
	if (!verifyId(pId)) {
		res.status(400);
		throw new Error("Product ID invalid");
	}

	const productIndex = getIndexOfProduct(wishList, id);

	if (productIndex === -1) {
		res.status(400);
		throw new Error("Product is not wishlisted!");
	}

	wishList.splice(productIndex, 1);
	await req.user.save();
	res.status(200).json({ message: "Removed product from wishlist!" });
});

export { addProductToWishList, removeProductFromWishList };
