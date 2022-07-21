import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { getIndexOfProduct, verifyId } from "../utils/helpers.js";
import User from "../models/User.js";

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({ sold: false });
	res.status(201).json({ products });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
	const {
		query: { category },
	} = req;

	if (!category) {
		res.status(400).json({ message: "Please enter category" });
	}

	const products = await Product.find({ category });
	res.status(200).json({ products });
});

const addProductToWishList = asyncHandler(async (req, res) => {
	const {
		params: { id },
		user: { wishList },
	} = req;

	if (!id) {
		res.status(400).json({ message: "Product ID invalid!" });
		throw new Error("Product ID invalid");
	}

	const pId = id.toString();
	if (!verifyId(pId)) {
		res.status(400).json({ message: "Product ID invalid!" });
		throw new Error("Product ID invalid");
	}

	const productIndex = getIndexOfProduct(wishList, id);

	if (productIndex > -1) {
		res.status(400).json({ message: "Product is already wishlisted!" });
		throw new Error("Product is already wishlisted!");
	}

	const product = await Product.findById(pId);

	if (!product || product.sold) {
		res.status(400).json({ message: "Product not found!" });
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
		res.status(400).json({ message: "Product ID invalid!" });
		throw new Error("Product ID invalid");
	}

	const pId = id.toString();
	if (!verifyId(pId)) {
		res.status(400).json({ message: "Product ID invalid!" });
		throw new Error("Product ID invalid");
	}

	const productIndex = getIndexOfProduct(wishList, id);

	if (productIndex === -1) {
		res.status(400).json({ message: "Product is not wishlisted!" });
		throw new Error("Product is not wishlisted!");
	}

	wishList.splice(productIndex, 1);
	await req.user.save();
	res.status(200).json({ message: "Removed product from wishlist!" });
});

const purchaseProduct = asyncHandler(async (req, res) => {
	const {
		params: { id },
		user: { purchasedProducts },
	} = req;

	if (!id) {
		res.status(400).json({ message: "Product ID invalid" });
		throw new Error("Product ID invalid");
	}

	const pId = id.toString();

	if (!verifyId(pId)) {
		res.status(400).json({ message: "Product ID invalid" });
		throw new Error("Product ID invalid");
	}

	const product = await Product.findById(pId, { _id: 1, sold: 1 });

	if (!product || product.sold) {
		res.status(400).json({ message: "Product not found" });
		throw new Error("Product not found!");
	}

	const productIndex = getIndexOfProduct(purchasedProducts, id);

	if (productIndex > -1) {
		res.status(400).json({ message: "Product already purchased" });
		throw new Error("Product already purchased");
	}

	product.sold = true;
	purchasedProducts.push(id);
	await product.save();
	await req.user.save();
	res.status(200).json({ message: "Purchased product successfully" });
});

const getWishListedProducts = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).populate("wishList").exec();
	res.status(200).json({ wishList: user.wishList });
});

const getPurchasedProducts = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
		.populate("purchasedProducts")
		.exec();
	res.status(200).json({ purchasedProducts: user.purchasedProducts });
});

export {
	getProducts,
	getWishListedProducts,
	addProductToWishList,
	removeProductFromWishList,
	purchaseProduct,
	getPurchasedProducts,
	getProductsByCategory,
};
