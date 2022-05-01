const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Exercise = require("../models/Exercise.model");

//Exercises list
router.get("/exercises", isLoggedIn, (req, res, next) => {
  Exercise.find()
    .then((response) => {
      res.render("exercises/exercises-list", { exercises: response });
    })
    .catch((error) => {
      console.log("Could not load Exercise list:", error);
    });
});

//Create exercises
router.get("/exercises/create", isLoggedIn, (req, res, next) => {
  res.render("exercises/create-exercise");
});

router.post("/exercises/create", isLoggedIn, (req, res, next) => {
  const ExerInfo = {
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    description: req.body.description,
    reps: req.body.reps,
  };
});

module.exports = router;
