const router = require("express").Router();
const Workout = require("../models/Workout.model");
const Exercise = require("../models/Exercise.model");



// Create new workout - render form
router.get("/:userId/create-new-workout", (req, res, next) => {
    console.log("create new workout was clicked >>>>>>>>>>>>>>>>", req.params.userId)
Exercise.find()
.then((exerciseDetails) => {
    console.log(exerciseDetails)
    res.render("workouts/create-new-workout", {exercise: exerciseDetails})
})
.catch((err) => {
    console.log("Error finding exercises on the DB", err)
})
})


// Create new exercise - process form
router.post("/:userId/create-new-workout", (req, res, next) => {
    console.log("exercise added to workout")
})

module.exports = router;