const router = require("express").Router();
const Workout = require("../models/Workout.model");
const Exercise = require("../models/Exercise.model");
const isClient = require("../middleware/isClient")

// Create new workout - render form - COMMENTED OUT AS TRYING SOMETHING ELSE
// router.get("/:userId/create-new-workout", (req, res, next) => {
//   console.log(
//     "create new workout was clicked >>>>>>>>>>>>>>>>",
//     req.params.userId
//   );
//   Exercise.find()
//     .then((exerciseDetails) => {
//       res.render("workouts/create-new-workout", { exercise: exerciseDetails });
//     })
//     .catch((err) => {
//       console.log("Error finding exercises on the DB", err);
//     });
// });

// Create new exercise - process form - COMMENTED OUT AS TRYING SOMETHING ELSE
// router.post("/:userId/create-new-workout", (req, res, next) => {
//   const newInfo = {
//     exerciseObject: {
//       properties: [
//         {
//           exercises: {
//             _id: req.body.exercises,
//           },
//         },
//       ],
//     },
//     description: req.body.description,
//   };
//   Workout.create(newInfo)
//     .populate("exerciseObject")
//     .then((newWorkout) => {
//       console.log(newWorkout);
//       res.redirect("/homepage");
//     });
// });

//Create new workout - render form
router.get("/:clientId/create-new-workout", isClient, (req, res, next) => {
  Exercise.find()
    .then((exerciseDetails) => {
      const workoutData = {
        exercise: exerciseDetails,
        userId: req.params.clientId,
      };
      res.render("workouts/create-new-workout", { workout: workoutData });
      console.log(workoutData);
    })
    .catch((err) => {
      console.log("Error finding exercises on the DB", err);
    });
});

//Create new workout - process form
router.post("/:clientId/add-new-workout", isClient, (req, res, next) => {
  const newWorkout = {
    exercises: req.body.exercise,
    description: req.body.description,
    user: req.params.clientId,
  };
  console.log(newWorkout);
  Workout.create(newWorkout).then((workoutData) => {
    res.redirect("/instructor/homepage");
  });
});

router.get('/:clientId/view-workout', isClient, (req, res, next) => {
  let user = req.params.clientId
  console.log(user)
  Workout.find({user: user})
    .populate("exercises")
    .then(workouts => {
      console.log(user)
      console.log(workouts)
      res.render('workouts/workout-list.hbs', {workouts: workouts})
    })
})

module.exports = router;
