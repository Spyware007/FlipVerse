import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// const createUser = asyncHandler(async (req, res) => {
// 	console.log("hel");
// 	const user = new User({
// 		name: "nishant",
// 		email: "sfjal",
// 		password: "abl",
// 	});

// 	await user.save();
// 	res.status(201).json({ user });
// 	console.log(user);
// });

export { createUser };
