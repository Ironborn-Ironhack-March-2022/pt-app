const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  catagory: {
    type: [String],
    enum: [
      "Olymic Lifting",
      "Yoga",
      "Cardio",
      "Interval",
      "Weight Lifting",
      "CrossFit",
      "Mix",
    ],
  },
  description: String,
  sets: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
