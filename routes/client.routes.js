const router = require("express").Router();
const User = require("../models/User.model");
const Workout = require("../models/Workout.model")

const isLoggedIn = require("../middleware/isLoggedIn");
const isClient = require("../middleware/isClient");

module.exports = router;

//Homepage
router.get("/homepage", (req, res, next) => {
 
  User.findById(req.session.user._id)
    .then((clientDetails) => { 
      console.log(clientDetails)
      res.render("clients/client-homepage", { client: clientDetails });
    })
    .catch((err) => {
      next(err);
    });
});

//Profile // add if statement for the instructor view to add a workout
router.get("/profile", (req, res, next) => {
  User.findById(req.session.user._id)
      .then((clientDetails) => {
      res.render("clients/client-profile", { client: clientDetails })
    })
    .catch((err) => {
      next(err);
    });
});

//Edit Profile - render form
router.get("/edit-profile", (req, res, next) => {
  User.findById(req.session.user._id)
      .then((clientDetails) => {
      res.render("clients/client-profile-edit", { client: clientDetails })
    })
    .catch((err) => {
      next(err);
    });
});

//Workout-list - display 
router.get("/:id/workout", (req, res, next) => {
  console.log(req.params.id)
  Workout.find({ User: req.params.id})
  .then((workoutDetails) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", workoutDetails)
    res.render("clients/client-workouts", { workout: workoutDetails })
    })
    .catch((err) => { console.log("Error getting workout from db", err)
    next(err);
  });
})

//Exercise-list
router.get("/exercises", isLoggedIn, isClient, (req, res, next) => {
  res.render("clients/exercises-list").catch((err) => {
    console.log("Error getting exercises from db", err);
    next(err);
  });
});

//Favourite Exercises
router.get("/favorites", (req, res, next) => {
  res.render("clients/client-favorites");
});

//Client-day
router.get("/client-day", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((clientDetails) => {
      res.render("clients/client-day", clientDetails);
    })
    .catch((err) => { console.log("Error getting day from db", err)
    next(err);
  })
})

// workouts to done

// completed workout
