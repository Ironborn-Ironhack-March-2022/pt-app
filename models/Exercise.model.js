const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    data: Buffer,
    type: String,
  },
  category: {
    type: [String],
    enum: ["Weight", "Yoga", "Cardio", "Interval", "Dance", "Balance", "Other"],
  },
  description: String,
  reps: {
    type: Number,
  },
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
