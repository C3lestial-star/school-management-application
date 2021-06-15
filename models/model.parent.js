const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      uppercase: false,
    },
    postcode: {
      type: String,
      required: true,
      uppercase: false,
    },
    houseNo: {
      type: String,
      required: true,
      uppercase: false,
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
