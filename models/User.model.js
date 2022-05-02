const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  { 
    username: {
      type: "String",
      required: [true, "Username is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["Instructor", "Client"],
      required: true
    },
    name: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
