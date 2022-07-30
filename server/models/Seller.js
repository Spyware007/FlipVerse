import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sellerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: Buffer,
			default: "",
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

sellerSchema.methods.generateAuthToken = async function () {
	const seller = this;

	const payload = { _id: seller._id };

	const token = await jwt.sign(payload, process.env.SECRET_KEY);

	seller.tokens = seller.tokens.concat({ token });

	await seller.save();

	return token;
};

sellerSchema.pre("save", async function (next) {
	const seller = this;

	if (!seller.isModified("password")) {
		next();
	}

	const hashedPassword = await bcrypt.hash(seller.password, 9);

	seller.password = hashedPassword;
});

sellerSchema.statics.findSellerByCredentials = async (email, password) => {
	try {
		const seller = await Seller.findOne({ email });

		if (!seller) {
			throw new Error("Seller does not exist.");
		}

		const isPasswordCorrect = await bcrypt.compare(password, seller.password);

		if (!isPasswordCorrect) {
			throw new Error("Please enter correct password.");
		}

		return seller;
	} catch (error) {
		console.log(error);
	}
};

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
