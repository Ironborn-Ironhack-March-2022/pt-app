const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const clientModel = new Schema(
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
    // dateOfBirth: Date,
    instructor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Client = model("Client", clientModel);

module.exports = Client;
