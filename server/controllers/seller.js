import asyncHandler from "express-async-handler";
import Seller from "../models/Seller.js";
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
  res.json({
    name,
    email,
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
	console.log(req.files[0]);
	if (!title || !category || price < 1) {
		res.status(400);
		throw new Error("Please provide valid details");
	}

	const imageBuffer = req.files[0].buffer ? req.files[0].buffer : null;

	const product = new Product({
		title,
		price,
		brand,
		category,
		description,
		image: imageBuffer,
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

	console.log(id);
	const pId = id.toString();
	if (!verifyId(pId)) {
		res.status(400);
		throw new Error("Product ID invalid");
	}

	const product = await Product.findById(pId)
		.populate("createdBy", ["name", "email"])
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

	const { title, createdBy, brand, description, category, price } = product;

	res.status(200).json({
		title,
		createdBy,
		brand,
		description,
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
    res.status(404);
    throw new Error("Product not found");
  }

  product.image = file.buffer;

  await product.save();

  res.status(201).json({ message: "Image added successfully", product });
});

export {
  getSellerProfile,
  updateSellerProfile,
  uploadProductImage,
  getSellerProducts,
  createProduct,
  deleteProduct,
  getProduct,
};
