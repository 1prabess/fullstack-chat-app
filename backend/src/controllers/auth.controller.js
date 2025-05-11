import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// -------------- Signup controller -------------------
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Check if any field is empty
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check if password is less than 6 characters
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });

    // Check if the email already exists & return if true
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    // Generate salt & has password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ email, fullName, password: hashedPassword });

    if (newUser) {
      await newUser.save();

      // Issue Token
      generateToken(newUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in signup controller: " + err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------- Login controller -------------------
export const login = async (req, res) => {
  res.send("Login");
};

// -------------- Logout controller -------------------
export const logout = async (req, res) => {
  res.send("Logout");
};
