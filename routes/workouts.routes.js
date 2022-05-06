const router = require("express").Router();
const Workout = require("../models/Workout.model");
const Exercise = require("../models/Exercise.model");
const isClient = require("../middleware/isClient");


//Create new workout - render form
router.get("/:clientId/create-new-workout", isClient, (req, res, next) => {
  Exercise.find({ createdBy: req.session.user._id })
    .then((exerciseDetails) => {
      const workoutData = {
        exercise: exerciseDetails,
        userId: req.params.clientId,
      };
      res.render("workouts/create-new-workout", { workout: workoutData });
    })
    .catch((err) => {
      console.log("Error finding exercises on the DB", err);
      next(err);
    });
});

//Create new workout - process form
router.post("/:clientId/add-new-workout", isClient, (req, res, next) => {
  const newWorkout = {
    exercises: req.body.exercise,
    description: req.body.description,
    user: req.params.clientId,
  };
  Workout.create(newWorkout).then((workoutData) => {
    res.redirect("/instructor/homepage");
  });
});

router.get("/:clientId/view-workout", isClient, (req, res, next) => {
  let user = req.params.clientId;
  Workout.find({ user: user })
    .populate("exercises")
    .then((workouts) => {
      res.render("workouts/workout-list.hbs", { workouts: workouts });
    });
});

module.exports = router;
