const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const isClient = require("../middleware/isClient");
const isTrainer = require("../middleware/isTrainer");
const path = require("path");
const cloudinary = require("../config/cloudinary.config");

// const upload = cloudinary({ storage: storage });
const Exercise = require("../models/Exercise.model");

//Exercises list
router.get("/", isLoggedIn, (req, res, next) => {
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
router.get("/create", isTrainer, (req, res, next) => {
  res.render("exercises/create-exercises");
});

router.post(
  "/create",
  cloudinary.single("file"),
  isTrainer,
  (req, res, next) => {
    console.log(req.file);
    if (!req.file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const newInfo = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image: req.file.path,
    };

    Exercise.create(newInfo)
      .then(() => {
        res.redirect("/exercises");
      })
      .catch((error) => {
        console.log("Could not create new Exercise", error);
      });
  }
);

router.get("/:exerciseId", isLoggedIn, (req, res, next) => {
  Exercise.findById(req.params.exerciseId)
    .then((exeInfo) => {
      res.render("exercises/exercise-details", exeInfo);
    })
    .catch((error) => {
      console.log("could not find exercise", error);
    });
});

router.get("/:exerciseId/edit", isTrainer, (req, res, next) => {
  Exercise.findById(req.params.exerciseId)
    .then((exeInfo) => {
      res.render("exercises/edit-exercise", exeInfo);
    })
    .catch((error) => {
      console.log("could not find exercise", error);
    });
});

router.post("/:exerciseId/edit", isTrainer, (req, res, next) => {
  const newInfo = {
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    reps: req.body.reps,
    sets: req.body.sets,
  };

  Exercise.findByIdAndUpdate(req.params.exerciseId, newInfo)
    .then(() => {
      res.redirect(`/exercises/${req.params.exerciseId}`);
    })
    .catch((error) => {
      console.log("could not find exercise", error);
    });
});

router.post("/:exerciseId/delete", isTrainer, (req, res, next) => {
  Exercise.findByIdAndDelete(req.params.exerciseId)
    .then(() => {
      res.redirect("/exercises");
    })
    .catch((error) => {
      console.log("could not delete exercise:", error);
    });
});

module.exports = router;
