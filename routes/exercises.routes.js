const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const isClient = require("../middleware/isClient");
const path = require("path");
const cloudinary = require("../config/cloudinary.config");
const User = require("../models/User.model");

// const upload = cloudinary({ storage: storage });
const Exercise = require("../models/Exercise.model");

//Exercises list
router.get("/", isLoggedIn, (req, res, next) => {
  let filter;
  const categorySearch = req.query.category;
  const nameSearch = req.query.name;
  if (
    nameSearch === undefined &&
    categorySearch === undefined &&
    req.session.user.role !== "client"
  ) {
    filter = {};
  } else if (
    nameSearch === undefined &&
    categorySearch === undefined &&
    req.session.user.role === "client"
  ) {
    filter = {
      createdBy: req.session.user.instructor,
    };
  } else if (
    nameSearch === "" &&
    categorySearch === "" &&
    req.session.user.role !== "client"
  ) {
    filter = {};
  } else if (
    nameSearch === "" &&
    categorySearch === "" &&
    req.session.user.role === "client"
  ) {
    filter = {
      createdBy: req.session.user.instructor,
    };
  } else if (
    nameSearch !== "" &&
    categorySearch === "" &&
    req.session.user.role !== "client"
  ) {
    filter = { name: nameSearch };
  } else if (
    nameSearch !== "" &&
    categorySearch === "" &&
    req.session.user.role === "client"
  ) {
    filter = { name: nameSearch, createdBy: req.session.user.instructor };
  } else if (
    nameSearch === "" &&
    categorySearch !== "" &&
    req.session.user.role !== "client"
  ) {
    filter = { category: categorySearch };
  } else if (
    nameSearch === "" &&
    categorySearch !== "" &&
    req.session.user.role === "client"
  ) {
    filter = {
      category: categorySearch,
      createdBy: req.session.user.instructor,
    };
  } else if (
    nameSearch !== "" &&
    categorySearch !== "" &&
    req.session.user.role !== "client"
  ) {
    filter = {
      name: nameSearch,
      category: categorySearch,
    };
  } else if (
    nameSearch !== "" &&
    categorySearch !== "" &&
    req.session.user.role === "client"
  ) {
    filter = {
      name: nameSearch,
      category: categorySearch,
      createdBy: req.session.user.instructor,
    };
  }
  Exercise.find(filter)
    .then((response) => {
      let instructor = false;
      if (req.session.user.role === "instructor") {
        instructor = true;
      }
      res.render("exercises/exercises-list", {
        exercises: response,
        instructor: instructor,
      });
    })
    .catch((error) => {
      console.log("Could not load Exercise list:", error);
    });
});

//Create exercises
router.get("/create", isClient, (req, res, next) => {
  res.render("exercises/create-exercises");
});

router.post(
  "/create",
  cloudinary.single("file"),
  isClient,
  (req, res, next) => {
    let imageInfo;
    if (req.file === undefined) {
      imageInfo =
        "https://res.cloudinary.com/coderkron/image/upload/v1651679344/pt-app/image-placeholder-icon-6_ta05wg.png";
    } else {
      imageInfo = req.file.path;
    }
    console.log(req.file);
    const newInfo = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      createdBy: req.session.user._id,
      image: imageInfo,
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

//Exercise details
router.get("/:exerciseId", isLoggedIn, (req, res, next) => {
  let instructor = false;
  if (req.session.user.role === "instructor") {
    instructor = true;
  }
  Exercise.findById(req.params.exerciseId)
    .then((exeInfo) => {
      res.render("exercises/exercise-details", {
        exeInfo: exeInfo,
        instructor: instructor,
      });
    })
    .catch((error) => {
      console.log("could not find exercise", error);
    });
});

//Edit exercise details
router.get("/:exerciseId/edit", isClient, (req, res, next) => {
  Exercise.findById(req.params.exerciseId)
    .then((exeInfo) => {
      res.render("exercises/edit-exercise", exeInfo);
    })
    .catch((error) => {
      console.log("could not find exercise", error);
    });
});

router.post(
  "/:exerciseId/edit",
  cloudinary.single("file"),
  isClient,
  (req, res, next) => {
    const exercise = Exercise.findById(req.params.exerciseId);
    let imageInfo;
    console.log(req.file);
    if (req.file !== undefined) {
      imageInfo = req.file.path;
    } else if (req.file === undefined) {
      imageInfo = exercise.image;
    }
    const newInfo = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      reps: req.body.reps,
      sets: req.body.sets,
      image: imageInfo,
    };

    Exercise.findByIdAndUpdate(req.params.exerciseId, newInfo)
      .then(() => {
        res.redirect(`/exercises/${req.params.exerciseId}`);
      })
      .catch((error) => {
        console.log("could not find exercise", error);
      });
  }
);

//delete Exercises
router.post("/:exerciseId/delete", isClient, (req, res, next) => {
  Exercise.findByIdAndDelete(req.params.exerciseId)
    .then(() => {
      res.redirect("/exercises");
    })
    .catch((error) => {
      console.log("could not delete exercise:", error);
    });
});

//Add Exercise to Favorites
router.post("/favorites/:exerciseId", (req, res, next) => {
  User.findByIdAndUpdate(req.session.user._id, {
    $push: { favorites: req.params.exerciseId },
  })
    .then(() => {
      res.redirect("/exercises");
    })
    .catch((err) => {
      console.log("There was an error added to favorites", err);
      next(err);
    });
});

module.exports = router;
