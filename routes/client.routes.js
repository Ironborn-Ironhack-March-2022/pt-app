const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isClient = require("../middleware/isClient");

module.exports = router;

//Homepage
router.get("/homepage", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((clientDetails) => {
      res.render("clients/client-homepage", { client: clientDetails });
    })
    .catch((err) => {
      next(err);
    });
});

//Profile // add if statement for the instructor view to add a workout
router.get("/profile", (req, res, next) => {
  User.findById(req.session.user._id)
<<<<<<< HEAD
      .then((clientDetails) => {
      res.render("clients/client-profile", { client: clientDetails })
=======
    .then((clientDetails) => {
      res.render("clients/client-profile", { client: clientDetails });
>>>>>>> 3731c40471f6fc91d3ff45be7f5694307634c5c8
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

//Workout-list
router.get("/workout", (req, res, next) => {
  User.findById(req.session.user._id)
<<<<<<< HEAD
  .then((clientDetails) => {
    res.render("clients/client-workouts", clientDetails)
})
    .catch((err) => { console.log("Error getting tasks from db", err)
    next(err);
  });
=======
    .then((clientDetails) => {
      res.render("clients/client-tasks", clientDetails);
    })
    .catch((err) => {
      console.log("Error getting tasks from db", err);
      next(err);
    });
>>>>>>> 3731c40471f6fc91d3ff45be7f5694307634c5c8
});

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
<<<<<<< HEAD
    .catch((err) => { console.log("Error getting day from db", err)
    next(err);
  })
})

// workouts to done

// completed workout
=======
    .catch((err) => {
      console.log("Error getting day from db", err);
      next(err);
    });
});
>>>>>>> 3731c40471f6fc91d3ff45be7f5694307634c5c8
