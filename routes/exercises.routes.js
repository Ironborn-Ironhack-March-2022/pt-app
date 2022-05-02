const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const path = require("path");
const cloudinary = require("../config/cloudinary.config");

// const storage = cloudinary.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images/exercises");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = cloudinary({ storage: storage });
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

router.post("/create", cloudinary.single("file"), (req, res, next) => {
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
