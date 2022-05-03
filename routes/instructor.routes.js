const router = require("express").Router();
const User = require("../models/User.model");

router.get("/homepage", (req, res, next) => {
    User.findById(req.session.user._id)
        .populate('clients')
        .then((instructorDetails) => {
            res.render("instructors/instructor-homepage.hbs", { instructor: instructorDetails })
        })
        .catch(err => {
            next(err)
        })
});

// Gets Instructor profile (using sesson id)
router.get("/profile", (req, res, next) => {
    User.findById(req.session.user._id)
        .then((instructorDetails) => {
            res.render("instructors/instructor-profile.hbs", { instructor: instructorDetails })
        })
        .catch(err => {
            next(err)
        })
});


// Edit users profiles
router.get('/profile/edit', (req, res, next) => {
    User.findById(req.session.user._id)
        .then(instructorDetails => {
            res.render('instructors/instructor-profile-edit.hbs', {instructor: instructorDetails})
        })
        .catch(err => {
            next(err)
        })
})

//Makes the edit 
router.post('/profile/edit', (req, res, next) =>{
    let updatedDetails = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
    User.findByIdAndUpdate(req.session.user._id, updatedDetails)
        .then(response => {
            res.redirect('/instructor/profile')
        })
        .catch(err => {
            next(err)
        })
})

// Instructor's client list (gathered using param id)
router.get("/:instructorId/client-list", (req, res, next) => {
    User.findById(req.params.instructorId, {new: true})
        .populate('clients')
        .then((instructorDetails) => {
            res.render("instructors/clients-list.hbs", { clients: instructorDetails.clients })
        })
})

//Workouts
router.get("/:instructorId/workouts", (req, res, next) => {
    res.render("instructors/instructor-workout.hbs")
})

//Add's client to instructors database and vice versa
router.post("/:instructorId/add-client", (req, res, next) => {
    User.find({ email: req.body.email })
        .then(client => {
            User.findByIdAndUpdate(req.params.instructorId, { $addToSet: { clients: client[0]._id } }, {new: true})
                .populate('clients')
                .then((instructorDetails) => {
                    res.render("instructors/instructor-homepage.hbs", {
                        instructor: instructorDetails,
                        message: "Successfully added client"
                    })
                })
        })
        .catch(err => {
            User.findById(req.params.instructorId)
                .then(instructor => {
                    return res.status(400).render("instructors/instructor-homepage.hbs",
                        {
                            instructor,
                            errorMessage: "Error adding user: Invalid username."
                        }
                    )
                });
        })
    // User.findById(req.params.instructorId)
    //     .then(instructor => {
    //         User.findOneAndUpdate({ email: req.body.email }, { $addToSet: {instructor: instructor}})
    //             .populate('instructor')
                
    //     })
    //     .catch(err => {
    //         User.findById(req.params.instructorId)
    //             .then(instructor => {
    //                 return res.status(400).render("instructors/instructor-homepage.hbs",
    //                     {
    //                         instructor,
    //                         errorMessage: "Error adding user: Invalid username."
    //                     }
    //                 )
    //             });
    //     })
})

    module.exports = router;
