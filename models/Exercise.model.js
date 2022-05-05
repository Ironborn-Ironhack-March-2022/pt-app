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
    default:
      "https://res.cloudinary.com/coderkron/image/upload/v1651679344/pt-app/image-placeholder-icon-6_ta05wg.png",
  },
  category: {
    type: [String],
    enum: ["weight", "yoga", "cardio", "interval", "dance", "balance", "other"],
  },
  description: String,
  reps: {
    type: Number,
    max: 15,
  },
  sets: {
    type: Number,
    max: 5,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
