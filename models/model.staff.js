const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    contact: Number,
    role: {
      type: String,
      enum: ["teacher", "admin"],
    },
    access: {
      type: Boolean,
      default: false,
    },
    class: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validPassword = async function (pwd) {
  const match = await bcrypt.compare(pwd, this.passwordHash);
  return match;
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Staff", userSchema);
