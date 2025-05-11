import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Retrieve Token
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    // Get user from token
    const user = await User.findOne({ _id: decoded.userId }).select(
      "-password"
    );

    // Set user in req
    req.user = user;

    next();
  } catch (err) {
    console.log(`Error ir protectRoute middleware: ` + err);
    return res.status(500).json({ message: "Internal Server Errror" });
  }
};
