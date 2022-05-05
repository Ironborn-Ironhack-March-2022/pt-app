const router = require("express").Router();
const User = require("../models/User.model");
const Workout = require("../models/Workout.model");
const path = require("path");
const cloudinary = require("../config/cloudinary.config");
const isLoggedIn = require("../middleware/isLoggedIn");
const isClient = require("../middleware/isClient");
const messages = [
  "You must be an Instructor to view instructor pages, redirected to client homepage",
];

//Homepage
router.get("/homepage", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((clientDetails) => {
      console.log(clientDetails);
      res.render("clients/client-homepage", {
        client: clientDetails,
        msg: messages[req.query.msg],
      });
    })
    .catch((err) => {
      next(err);
    });
});

//Profile // add if statement for the instructor view to add a workout
router.get("/profile", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((clientDetails) => {
      res.render("clients/client-profile", { client: clientDetails });
    })
    .catch((err) => {
      next(err);
    });
});

//Edit Profile - render form
router.get("/edit-profile", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((clientDetails) => {
      res.render("clients/client-profile-edit", { client: clientDetails });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/edit-profile", cloudinary.single("file"), (req, res, next) => {
  let user = req.session.user;
  let imageInfo;
  console.log(req.file);
  if (req.file !== undefined) {
    imageInfo = req.file.path;
  } else if (req.file === undefined) {
    imageInfo = user.image;
  }
  const newInfo = {
    email: req.body.email || user.email,
    userName: req.body.userName || user.userName,
    about: req.body.about,
    image: imageInfo,
  };

  User.findByIdAndUpdate(user._id, newInfo)
    .then(() => {
      res.redirect(`/client/profile`);
    })
    .catch((error) => {
      console.log("Could not update profile:", error);
    });
});

//Workout-list - display
router.get("/:userId/workout", (req, res, next) => {
  Workout.find({ user: req.params.userId })
    .populate("exercises")
    .then((workoutDetails) => {
      res.render("clients/client-workouts", { workout: workoutDetails });
    })
    .catch((err) => {
      console.log("Error getting workout from db", err);
      next(err);
    });
});

//Work-list - mark as done
router.post("/:workoutId/complete-workout", (req, res, next) => {
  Workout.findByIdAndUpdate(
    { _id: req.params.workoutId },
    { toDo: false },
    { new: true }
  )
    .then((updatedWorkout) => {
      Workout.find({ user: req.session.user._id })
        .populate("exercises")
        .then((workoutArray) => {
          res.render("clients/client-workouts", { workout: workoutArray });
        });
    })
    .catch((err) => {
      console.log("Error updating workout", err);
      next(err);
    });
});

//Favourite Exercises
router.get("/favorites", (req, res, next) => {
  res.render("clients/client-favorites");
});

//Display Instructor
router.get("/:clientId/client-instructor", (req, res, next) => {
User.findById(req.session.user._id)
.populate("instructor")
.then((response) => {
res.render("clients/client-instructor", response);
})
.catch((err) => {
  console.log("Error updating workout", err);
  next(err);
});
})

//Client-day
router.get("/client-day", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((clientDetails) => {
      res.render("clients/client-day", clientDetails);
    })
    .catch((err) => {
      console.log("Error getting day from db", err);
      next(err);
    });
});

// workouts to done

// completed workout

module.exports = router;
