const router = require("express").Router();
const Workout = require("../models/Workout.model");
const Exercise = require("../models/Exercise.model");

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
router.get("/create-new-workout", (req, res, next) => {
  console.log(
    "create new workout was clicked >>>>>>>>>>>>>>>>"  );
  Exercise.find()
    .then((exerciseDetails) => {
      res.render("workouts/create-new-workout", {exercise: exerciseDetails });
    })
    .catch((err) => {
      console.log("Error finding exercises on the DB", err);
    });
});

module.exports = router;
