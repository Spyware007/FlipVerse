import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc Register User
// @route /signup
// @access Public
const createUser = asyncHandler(async (req, res) => {
	let { name, email, password, role } = req.body;
	password = password.toString();
	if (!name || !email || !password) {
		res.status(404);
		throw new Error("Please provide valid credentials");
	}

	const isUser = await User.findOne({ email });

	if (isUser) {
		res.status(404);
		throw new Error("User already exists.");
	}

	const user = new User({
		name,
		email,
		password,
		role,
	});

	const token = await user.generateAuthToken();

	res.status(201).json({ name, email, role, token });
});

// @desc Login User
// @route /login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findUserByCredentials(email, password);

	if (!user) {
		res.status(404).send();
		throw new Error("Please enter correct email and password.");
	}

	const token = await user.generateAuthToken();

	res.status(200).json({
		name: user.name,
		email: user.email,
		token,
	});
});

// @desc Logout User
// @route /logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
	req.user.tokens = req.user.tokens.filter((token) => {
		return token.token != req.token;
	});

	await req.user.save();
	res.status(200).send();
});

export { createUser, loginUser, logoutUser };
