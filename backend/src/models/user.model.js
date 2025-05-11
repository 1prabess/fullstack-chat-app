import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    fullName: {
      type: String,
      required: [true, "Fullname is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be minimum 6 characters long"],
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
