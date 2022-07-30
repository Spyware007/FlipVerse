import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
		address: {
			type: String,
			// required: true,
		},
		role: {
			type: String,
			default: "Subscriber",
		},
		image: {
			type: Buffer,
			default: "",
		},
		walletAddress: {
			type: String,
		},
		wishList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		purchasedProducts: [
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
	{ timestamps: true },
);

userSchema.statics.findUserByCredentials = async (email, password) => {
	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error("User does not exist.");
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new Error("Please enter correct password.");
		}

		return user;
	} catch (error) {
		console.log(error);
	}
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;

	const payload = { _id: user._id };

	const token = await jwt.sign(payload, process.env.SECRET_KEY);

	user.tokens = user.tokens.concat({ token });

	await user.save();

	return token;
};

userSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) {
		next();
	}

	const hashedPassword = await bcrypt.hash(user.password, 9);

	user.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);
export default User;
