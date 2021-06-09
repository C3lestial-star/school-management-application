const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide the DOB"],
      set: function (v) {
        return new Date(v.getDate(), v.getMonth(), v.getFullYear());
      },
      trim: true,
    },
    class: {
      type: String,
      required: [true, "Please fill in the class"],
    },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "parent" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", userSchema);
