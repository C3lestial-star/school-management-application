const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");

const staffSchema = new mongoose.Schema(
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
    class: [String],
  },
  {
    timestamps: true,
  }
);

staffSchema.methods.validPassword = async function (pwd) {
  const match = await bcrypt.compare(pwd, this.passwordHash);
  return match;
};

staffSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Staff", staffSchema);
