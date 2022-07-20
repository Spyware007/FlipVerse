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

	const buffer = Buffer.from(user.image);

	const base64Image = buffer.toString("base64");

	const { name, email, role, _id, address } = user;
	res.json({
		name,
		email,
		role,
		_id,
		image: base64Image,
		address,
	});
});

//@desc Update user image
//@route /profile/image
//@access private
const uploadUserImage = asyncHandler(async (req, res) => {
	let imageType = "";
	const fileName = req.file.originalname;

	for (let i = fileName.length - 1; i >= 0; i--) {
		console.log(fileName[i]);
		imageType += fileName[i];
		if (fileName[i] == ".") break;
	}

	const arrStrs = imageType.split("");
	const reverseStrsArray = arrStrs.reverse();
	const joinedString = reverseStrsArray.join("");

	req.user.imageType = joinedString;
	req.user.image = req.file.buffer;
	await req.user.save();

	res.status(201).json({ message: "Image added successfully" });
});

//@desc Update user Profile
//@route /user/profile/
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

export { getUserProfile, updateUserProfile, uploadUserImage };
