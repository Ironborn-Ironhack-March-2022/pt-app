const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Exercise = require("../models/Exercise.model");

//Exercises list
router.get("/", (req, res, next) => {
  Exercise.find()
    .then((response) => {
      console.log(response);
      res.render("exercises/exercises-list", { exercises: response });
    })
    .catch((error) => {
      console.log("Could not load Exercise list:", error);
    });
});

//Create exercises
router.get("/create", (req, res, next) => {
  res.render("exercises/create-exercises");
});

router.post("/exercises/create", (req, res, next) => {
  const newInfo = {
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    description: req.body.description,
    reps: req.body.reps,
    sets: req.body.sets,
  };
  Exercise.create(newInfo)
    .then(() => {
      res.redirect("/exercises");
    })
    .catch((error) => {
      console.log("Could not create new Exercise", error);
    });
});

module.exports = router;
