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
		image: {
			type: Buffer,
		},
		stock: {
			type: Number,
			required: [true, "Please enter product stock"],
			maxlength: [4, "Stock cannot exceed limit"],
			default: 1,
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
