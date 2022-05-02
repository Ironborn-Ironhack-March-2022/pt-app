const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const instructorSchema = new Schema(
  {
    userName: String,
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
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Instructor = model("Instructor", instructorSchema);

module.exports = Instructor;
