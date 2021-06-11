const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    address: {
      houseNo: Number,
      street: String,
      city: String,
    },
    contact: Number,
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      lowercase: true,
      trim: true,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parent", userSchema);
