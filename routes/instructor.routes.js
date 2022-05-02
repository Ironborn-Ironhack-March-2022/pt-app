const router = require("express").Router();
const User = require("../models/User.model");






router.get("/profile", (req, res, next) => {
    User.findById(req.session.user._id)
        .then((instructorDetails) => {
            res.render("instructors/instructor-profile.hbs", {instructor: instructorDetails})
        })
        .catch(err => {
            next(err)
        })
  });

router.get("/:instructorId/client-list", (req, res, next) => {
    console.log(req.params)
    User.findById(req.params.instructorId)
        .then( (instructorDetails) => {
            console.log(instructorDetails)
            res.render("instructors/clients-list.hbs")
        })
})

router.get("/:instructorId/workouts", (req, res, next) => {
    res.render("instructors/instructor-workout.hbs")
})
module.exports = router;
