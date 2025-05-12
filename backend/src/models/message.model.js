import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "SenderId is required"],
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ReceiverId is required"],
    },

    text: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = new mongoose.model("Message", messageSchema);

export default Message;
