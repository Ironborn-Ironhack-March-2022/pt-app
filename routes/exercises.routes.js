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
  console.log(req.query.category);
  console.log(req.query.name);
  const categorySearch = req.query.category;
  const nameSearch = req.query.name;
  if (nameSearch === undefined && categorySearch === undefined) {
    filter = {};
  } else if (nameSearch === "" && categorySearch === "") {
    filter = {};
  } else if (nameSearch !== "" && categorySearch === "") {
    filter = { name: nameSearch };
  } else if (nameSearch === "" && categorySearch !== "") {
    filter = { category: categorySearch };
  } else if (nameSearch !== "" && categorySearch !== "") {
    filter = {
      name: nameSearch,
      category: categorySearch,
    };
  }
  Exercise.find(filter)
    .then((response) => {
      res.render("exercises/exercises-list", { exercises: response });
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

router.get("/:exerciseId/edit", isClient, (req, res, next) => {
  Exercise.findById(req.params.exerciseId)
    .then((exeInfo) => {
      res.render("exercises/edit-exercise", exeInfo);
    })
    .catch((error) => {
      console.log("could not find exercise", error);
    });
});

router.post("/:exerciseId/edit", isClient, (req, res, next) => {
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
  User.findByIdAndUpdate(req.session.user._id, {$push: {favorites: req.params.exerciseId}})
  .then(() => {
    res.redirect("/exercises")
  })
  .catch(err => {
    console.log("There was an error adding to favorites", err)
    next(err)
  })
})

//Remove Exercise from Favorites
router.post("/favorites/:exerciseId/remove", (req, res, next) => {
  User.findByIdAndUpdate(req.session.user._id, {$pull: {favorites: req.params.exerciseId}})
  .then(() => {
    res.redirect("/user/favorites")
  })
  .catch(err => {
    console.log("There was an error removing from favorites", err)
    next(err)
  })
})

module.exports = router;
