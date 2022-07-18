import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/db.js";
import { errorMiddleware, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/user.js";

const PORT = 6000 || process.env.PORT;

const app = express();

console.log("FD");
// db connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);
// app.use(notFound);

// Routers
app.use(userRouter);

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
