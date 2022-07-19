import mongoose from "mongoose";
const { Schema } = mongoose;

const sellerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

const Seller = mongoose.model("Product", sellerSchema);

export default Seller;
