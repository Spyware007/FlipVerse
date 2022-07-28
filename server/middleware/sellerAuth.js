import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

const sellerMiddleware = async (req, res, next) => {
	const token = req.header("x-auth-seller-token");
	// console.log(token);
	try {
		const decodedSeller = await jwt.verify(token, process.env.SECRET_KEY);

		const seller = await Seller.findOne({
			_id: decodedSeller._id,
			"tokens.token": token,
		});

		if (!seller) {
			res.status(400).json({ message: "Seller not found" });
			throw new Error("Could not find seller");
		}

		req.token = token;
		req.seller = seller;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Seller not found" });
	}
};

export default sellerMiddleware;
