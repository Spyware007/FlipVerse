import mongoose from "mongoose";
import "dotenv/config.js";

const connectDB = async () => {
	try {
		console.log(process.env.MONGO_URI);
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
