const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const daySchema = new Schema({
  breakfast: {
    type: String,
    required: true,
    trim: true,
  },
  lunch: {
    type: String,
    required: true,
    trim: true,
  },
  dinner: {
    type: String,
    required: true,
    trim: true,
  },
  sleep: {
    type: Number,
    min: 0,
    max: 16,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Day = model("Day", daySchema);

module.exports = Day;
