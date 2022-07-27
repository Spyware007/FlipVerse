import asyncHandler from "express-async-handler";
import Seller from "../../models/Seller.js";
import { validateEmail } from "../../helpers/auth.js";

// @desc Get Sellers
// @route /signup
// @access Public
const getAllSellers = async (req, res) => {
	const sellers = await Seller.find({});
	res.status(200).json({ sellers });
};

// @desc Register Seller
// @route /signup
// @access Public
const createSeller = asyncHandler(async (req, res) => {
	let { name, email, password } = req.body;
	password = password.toString();
	if (!name || !email || !password || !validateEmail(email)) {
		res.status(404).json({ message: "Please provide valid credentials" });
		throw new Error();
	}

	const isSeller = await Seller.findOne({ email });

	if (isSeller) {
		res.status(404).json({ message: "Seller already exists" });
		return;
		// throw new Error("Seller already exists.");
	}

	const seller = new Seller({
		name,
		email,
		password,
	});

	const token = await seller.generateAuthToken();

	res.status(201).json({ name, email, token });
});

// @desc Login Seller
// @route /login
// @access Public
const loginSeller = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!validateEmail(email)) {
		res.status(404).json({ message: "Please enter valid email" });
		return;
	}

	const seller = await Seller.findSellerByCredentials(email, password);

	if (!seller) {
		res
			.status(404)
			.json({ message: "Please enter correct email and password." });
		return;
	}

	const token = await seller.generateAuthToken();

	res.status(200).json({
		name: seller.name,
		email: seller.email,
		token,
	});
});

// @desc Logout Seller
// @route /logout
// @access Private
const logoutSeller = asyncHandler(async (req, res) => {
	req.seller.tokens = req.seller.tokens.filter((token) => {
		return token.token != req.token;
	});

	await req.seller.save();
	res.status(200).send();
});

// @desc Logout Seller From all devices
// @route /logout/all
// @access Private
const logoutSellerFromAllDevices = async (req, res) => {
	req.seller.tokens = [];
	await req.seller.save();
	res.status(200).send();
};

export {
	getAllSellers,
	createSeller,
	loginSeller,
	logoutSeller,
	logoutSellerFromAllDevices,
};
