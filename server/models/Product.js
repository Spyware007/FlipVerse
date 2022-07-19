import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		brand: {
			type: String,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		imageUrl: {
			type: String,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Seller",
		},
	},
	{
		timestamps: true,
	},
);

const Product = mongoose.model("Product", productSchema);

export default Product;
