const router = require("express").Router();
const Workout = require("../models/Workout.model");
const Exercise = require("../models/Exercise.model");



// Create new workout - render form
router.get("/:userId/create-new-workout", (req, res, next) => {
    console.log("create new workout was clicked >>>>>>>>>>>>>>>>", req.params.userId)
Exercise.find()
.then((exercises) => {
    console.log(exercises)
    res.render("workouts/create-new-workout", exercises)
})
.catch((err) => {
    console.log("Error finding exercises on the DB", err)
})
})

module.exports = router;