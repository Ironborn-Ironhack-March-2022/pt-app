const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
  },
  category: {
    type: [String],
    enum: ["weight", "yoga", "cardio", "interval", "dance", "balance", "other"],
  },
  description: String,
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
