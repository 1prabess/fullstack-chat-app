import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// -------------- Signup controller -------------------
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
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
  try {
    const { email, password } = req.body;
    // Check the fields are empty
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password must be provided" });

    // Check if the user really exists
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Issue Token
    generateToken(user._id, res);

    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Error in login controller: " + err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------- Logout controller -------------------
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in logout controller: " + err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------- Update Profile controller -------------------
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic)
      return res.status(400).json({ message: "Profile picture is required" });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error in logout controller: " + err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------- Check Auth controller -------------------
export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in checkAuth controller: " + err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
