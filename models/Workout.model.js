const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  exercises: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
        },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // feedback: String, - MVP FIRST
  toDo: {
    type: Boolean,
    default: true
  } 
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
