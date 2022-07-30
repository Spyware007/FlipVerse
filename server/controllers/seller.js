import asyncHandler from "express-async-handler";
import Seller from "../models/Seller.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { verifyId, getIndexOfProduct } from "../utils/helpers.js";

//@desc Get seller Profile
//@route /seller/profile
//@access private
const getSellerProfile = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.seller._id);

	if (!seller) {
		res.status(404);
		throw new Error("Seller doesn't exist");
	}

	const { name, email, _id, image, address } = seller;
	let buffer;
	let base64Image;
	if (image) {
		buffer = Buffer.from(image);
		base64Image = buffer.toString("base64");
	}
	res.json({
		name,
		email,
		_id,
		image: base64Image ? base64Image : "",
		address,
	});
});

//@desc Update seller Profile
//@route /profile/me
//@access private
const updateSellerProfile = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.seller._id);

	const { name, email, role, image } = req.body; //address removed

	if (seller) {
		seller.name = name || seller.name;
		seller.email = email || seller.email;
		seller.role = role || seller.role;
		seller.image = image || seller.image;
		// seller.address = address || seller.address;

		await seller.save();
		res.status(200).json({
			_id: seller._id,
			name: seller.name,
			email: seller.email,
			role: seller.role,
			// address: seller.address,
		});
	} else {
		res.status(404);
		throw new Error("Seller not found");
	}
});

const uploadSellerImage = asyncHandler(async (req, res) => {
	// console.log(req.file);
	req.seller.image = req.file.buffer;
	await req.seller.save();
	res.status(201).json({ message: "Image added successfully" });
});

const createProduct = asyncHandler(async (req, res) => {
	let {
		_id,
		title,
		category,
		price,
		brand,
		description,
		hasWarranty,
		warrantyDuration,
	} = req.body;
	const warrantyDurationInSeconds =
		parseInt(warrantyDuration) * 365 * 24 * 60 * 60;

	if (!title || !category || price < 1) {
		res.status(400).json({ message: "Please Provide valid details" });
		throw new Error("Please provide valid details");
	}
	category = category.toLowerCase();

	const imageBuffer = req.files[0].buffer ? req.files[0].buffer : null;

	const product = new Product({
		_id,
		title,
		price,
		brand,
		category,
		description,
		image: imageBuffer,
		warrantyDurationInSeconds,
		hasWarranty: hasWarranty ? true : false,
		createdBy: req.seller._id,
	});

	await product.save();
	req.seller.products.push(product._id);
	await req.seller.save();
	res.status(201).json({ product, message: "Product created successfully" });
});

const getSellerProducts = asyncHandler(async (req, res) => {
	const sellerProducts = await Seller.findById(req.seller._id)
		.populate("products")
		.exec();

	const finalProducts = sellerProducts.products.map((product) => {
		if (product.image) {
			let buffer = Buffer.from(product.image);
			let base64Image = buffer.toString("base64");
			const {
				title,
				_id,
				description,
				price,
				category,
				brand,
				createdBy,
				createdAt,
				updatedAt,
				sold,
				isReadyForSale,
			} = product;
			return {
				image: base64Image,
				_id,
				title,
				description,
				price,
				category,
				createdBy,
				createdAt,
				updatedAt,
				brand,
				sold,
				isReadyForSale,
			};
		} else {
			return product;
		}
	});
	res.status(200).json({ sellerProducts: finalProducts });
});

const getProduct = asyncHandler(async (req, res) => {
	const {
		params: { id },
	} = req;

	const pId = id.toString();
	if (!verifyId(pId)) {
		res.status(400);
		throw new Error("Product ID invalid");
	}

	const product = await Product.findById(pId)
		.populate("createdBy", ["name", "email"])
		.populate("orderedBy", ["walletAddress"])
		.exec();

	if (!product) {
		res.status(404).json({ message: "Product not found" });
		throw new Error("Product not found");
	}

	let buffer, base64Image;
	if (product.image) {
		buffer = Buffer.from(product.image);
		base64Image = buffer.toString("base64");
	}

	const {
		title,
		createdBy,
		brand,
		description,
		category,
		price,
		tokenId,
		isReadyForSale,
		sold,
		hasWarranty,
		orderedBy,
		warrantyDurationInSeconds,
	} = product;

	res.status(200).json({
		title,
		createdBy,
		brand,
		hasWarranty,
		sold,
		warrantyDurationInSeconds,
		description,
		isReadyForSale,
		orderedBy,
		productTokenId: tokenId,
		image: product.image ? base64Image : "",
		price,
		category,
	});
});

const deleteProduct = asyncHandler(async (req, res) => {
	const { params, seller } = req;
	const pId = params.id.toString();

	if (!verifyId(pId)) {
		res.status(400);
		throw new Error("Product ID invalid");
	}

	const product = await Product.findById(pId);

	const pIdIndex = getIndexOfProduct(seller.products, pId);

	if (!product || pIdIndex < -1) {
		res.status(404);
		throw new Error("Product not found");
	}

	await product.delete();
	seller.products.splice(pIdIndex, 1);

	await seller.save();
	res.status(201).json({ message: "Product removed successfully" });
});

const uploadProductImage = asyncHandler(async (req, res) => {
	const {
		file,
		params: { id },
		seller,
	} = req;

	const pId = id.toString();
	const product = await Product.findById(pId);
	const pIdIndex = getIndexOfProduct(seller.products, pId);

	if (!product || pIdIndex < -1) {
		res.status(404).json({ message: "Product not found" });
		throw new Error("Product not found");
	}

	product.image = file.buffer;

	await product.save();

	res.status(201).json({ message: "Image added successfully", product });
});

const confirmPurchaseOfProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { tId } = req.body;
	const product = await Product.findById(id);

	if (!product || product.createdBy.toString() !== req.seller._id.toString()) {
		res.status(400).json({ message: "Product not found" });
		return;
	}

	const buyer = await User.findById(product.orderedBy);

	product.sold = true;
	product.isReadyForSale = false;
	product.tokenId = tId;
	buyer.purchasedProducts.push(id);

	await product.save();
	await buyer.save();

	res.status(200).json({ message: "Product dispatched successfully" });
});

export {
	getSellerProfile,
	updateSellerProfile,
	uploadProductImage,
	getSellerProducts,
	createProduct,
	deleteProduct,
	getProduct,
	confirmPurchaseOfProduct,
	uploadSellerImage,
};
