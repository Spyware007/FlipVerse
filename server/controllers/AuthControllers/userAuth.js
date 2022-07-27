import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import { validateEmail } from "../../helpers/auth.js";

// @desc Get Users
// @route /signup
// @access Public
const getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.status(200).json({ users });
};

// @desc Register User
// @route /signup
// @access Public
const createUser = asyncHandler(async (req, res) => {
	let { name, email, password, role, address } = req.body;
	password = password.toString();

	if (!name || !email || !password || !validateEmail(email)) {
		res.status(404).json({ message: "Please provide valid credentials" });
		throw new Error("Please provide valid credentials");
	}

	const isUser = await User.findOne({ email });

	if (isUser) {
		res.status(404).json({ message: "User already exists." });
		return;
	}

	const user = new User({
		name,
		email,
		password,
		role,
		address,
	});

	const token = await user.generateAuthToken();

	res.status(201).json({ name, email, role, token, address });
});

// @desc Login User
// @route /login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!validateEmail(email)) {
		res.status(404).json({ message: "Please enter valid email" });
		return;
	}

	const user = await User.findUserByCredentials(email, password);

	if (!user) {
		res.status(404).json("Please enter correct email and password.");
		return;
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

// @desc Logout User From all devices
// @route /logout/all
// @access Private
const logoutUserFromAllDevices = async (req, res) => {
	req.user.tokens = [];
	await req.user.save();
	res.status(200).send();
};

export {
	getAllUsers,
	createUser,
	loginUser,
	logoutUser,
	logoutUserFromAllDevices,
};
