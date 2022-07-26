import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/db.js";
import { errorMiddleware, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import sellerRouter from "./routes/seller.js";
import userAuthRouter from "./routes/authRoutes/userAuth.js";
import sellerAuthRouter from "./routes/authRoutes/sellerAuth.js";

const PORT = 8000 || process.env.PORT;

const app = express();

// DB connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
// app.use(notFound);

// Routers
app.use(sellerAuthRouter);
app.use(userAuthRouter);
app.use(userRouter);
app.use(sellerRouter);
app.use(productRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
