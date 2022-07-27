import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuthMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-user-token");
  // console.log(token);
  try {
    const decodedUser = await jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({
      _id: decodedUser._id,
      "tokens.token": token,
    });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      throw new Error("Could not find user");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "User not found" });
  }
};

export default userAuthMiddleware;
