import asyncHandler from "express-async-handler";
import User from "../models/User.js";

//@desc Get user Profile
//@route /user/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error("User doesn't exist");
	}

	const { name, email, role, _id, image, address } = user;
	res.json({
		name,
		email,
		role,
		_id,
		image,
		address,
	});
});

//@desc Update user Profile
//@route /profile/me
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	const { name, email, role, image, address } = req.body;

	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		user.role = role || user.role;
		user.image = image || user.image;
		user.address = address || user.address;

		await user.save();
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			address: user.address,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export { getUserProfile, updateUserProfile };
