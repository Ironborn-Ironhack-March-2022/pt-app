const mongoose = require("mongoose");
const Exercise = require("../models/Exercise.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/project2";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((error) => {
    console.error("Error connecting to mongo: ", err);
  });

const exercises = [
  {
    name: "Deadlift",
    image: "/public/images/Deadlift.jpeg",
    category: "weight",
    description:
      "The deadlift is a movement in which your hips hinge backward to lower down and pick up a weighted barbell or kettlebell from the floor. Your back is flat throughout the movement.",
    reps: 12,
    sets: 4,
  },
  {
    name: "Bench Press",
    image: "/public/images/bench-press.png",
    category: "weight",
    description:
      "a lift or exercise in which a weight is raised by extending the arms upward while lying on a bench.",
    reps: 8,
    sets: 5,
  },
  {
    name: "Arnold Press",
    image: "/public/images/arnold-press.jpeg",
    category: "weight",
    description:
      "The Arnold presses is defined by a wrist rotation movement that ends when your palms face forward at the top of the press. The Arnold press uses dumbbells to work many of the main muscle groups in your upper body, including the triceps, trapezius, and the delts.",
    reps: 5,
    sets: 5,
  },
  {
    name: "Pull Up",
    image: "/public/images/pull-up.jpeg",
    category: "other",
    description:
      "an exercise in which one hangs by the hands from a support (such as a horizontal bar) and pulls oneself up until the chin is level with the support specifically : such an exercise done with the palms facing outward — compare chin-up. pull up.",
    reps: 8,
    sets: 3,
  },
  {
    name: "5k",
    image: "/public/images/Running.jpeg",
    category: "cardio",
    description:
      "Exercise where you run 5 kilometers on 80% of your running speed.",
    reps: 1,
    sets: 1,
  },
  {
    name: "Box Jumps",
    image: "/public/images/box-jump.png",
    category: "balance",
    description:
      "Exercise where one must jump on top of Boxes and keep their balance. Either with 1 leg or with 2 legs.",
    reps: 20,
    sets: 3,
  },
];

Exercise.create(exercises)
  .then((exercisesFromDb) => {
    console.log(`Created ${exercisesFromDb}`);
  })
  .catch((error) => {
    console.log("could not create exercises:", error);
  });
