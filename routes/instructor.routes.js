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
        .populate('clients')
        .then( (instructorDetails) => {
            console.log(instructorDetails)
            res.render("instructors/clients-list.hbs", {clients: instructorDetails.clients})
        })
})

router.get("/:instructorId/workouts", (req, res, next) => {
    res.render("instructors/instructor-workout.hbs")
})


router.post("/:instructorId/add-client", (req, res, next) => {
    User.find({ email: req.body.email })
        .then(client => {
        User.findByIdAndUpdate(req.params.instructorId, { $push: { clients: client[0]._id } })
            .populate('clients')
            .then((instructorDetails) => {
                console.log(instructorDetails)
                res.render("instructors/clients-list.hbs", {clients: instructorDetails.clients})
            })
            .catch(err => next(err))
        })
        // need to add instructor to client as well 
        .catch(err => next(err))
})



module.exports = router;
