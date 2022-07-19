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

	console.log(user);
	const token = await user.generateAuthToken();

	res.status(201).json({ name, email, role, token });
});

export { createUser };
