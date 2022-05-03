const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  exerciseObject: {
    type: Object,
    properties: [
      {
        exercises: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
        },
        reps: Number,
        sets: Number,
      },
    ],
  },

  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  feedback: String,
  completed: Boolean,
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
