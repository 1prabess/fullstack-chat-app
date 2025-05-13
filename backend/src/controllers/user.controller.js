import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";

// -------------- Get Friends controller -------------------
export const getFriends = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log(loggedInUserId);

    // Find the logged-in user and populate (expand) the 'friends' field
    const user = await User.findById(loggedInUserId).populate(
      "friends",
      "-password"
    );

    return res.status(200).json(user.friends);
  } catch (err) {
    console.error("Error in getFriends controller:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
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
    console.log("Error in updateProfile controller: " + err.message);
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

// -------------- Add friend controller -------------------
export const addFriend = async (req, res) => {
  try {
    const { id: friendToAddId } = req.params;
    const loggedInUserId = req.user._id;

    // Prevent adding self
    if (loggedInUserId.toString() === friendToAddId)
      return res.status(400).json({ message: "You cannot add yourself" });

    // Check if friend to add exists
    const friend = await User.findById({ _id: friendToAddId });

    if (!friend)
      return res
        .status(400)
        .json({ message: "The user you're trying to add does not exist" });

    // Check if already friends
    const loggedInUser = await User.findById(loggedInUserId);
    if (loggedInUser.friends.includes(friendToAddId))
      return res.status(400).json({ message: "Already friends" });

    // Add each other as friends
    loggedInUser.friends.push(friendToAddId);
    friend.friends.push(loggedInUserId);

    await loggedInUser.save();
    await friend.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (err) {
    console.error("Error in addFriend controller:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
