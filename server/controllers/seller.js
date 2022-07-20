import asyncHandler from "express-async-handler";
import Seller from "../models/Seller.js";

//@desc Get seller Profile
//@route /seller/profile
//@access private
const getSellerProfile = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.seller._id);

	if (!seller) {
		res.status(404);
		throw new Error("Seller doesn't exist");
	}

	const { name, email, role, _id, image, address } = seller;
	res.json({
		name,
		email,
		role,
		_id,
		image,
		address,
	});
});

//@desc Update seller Profile
//@route /profile/me
//@access private
const updateSellerProfile = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.seller._id);

	const { name, email, role, image, address } = req.body;

	if (seller) {
		seller.name = name || seller.name;
		seller.email = email || seller.email;
		seller.role = role || seller.role;
		seller.image = image || seller.image;
		seller.address = address || seller.address;

		await seller.save();
		res.status(200).json({
			_id: seller._id,
			name: seller.name,
			email: seller.email,
			role: seller.role,
			address: seller.address,
		});
	} else {
		res.status(404);
		throw new Error("Seller not found");
	}
});

const createProduct = asyncHandler(async (req, res) => {
	const { title, category, price, brand, description } = req.body;
});
export { getSellerProfile, updateSellerProfile };
