const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    Message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;