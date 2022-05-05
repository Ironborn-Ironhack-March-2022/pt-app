const router = require("express").Router();
const User = require("../models/User.model");
const path = require("path");
const cloudinary = require("../config/cloudinary.config");
const isClient = require("../middleware/isClient");
const msg = [
  "User not found",
];

router.get("/homepage", isClient, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("clients")
    .then((instructorDetails) => {
      res.render("instructors/instructor-homepage.hbs", {
        instructor: instructorDetails,
        msg: msg[req.query.msg]
      });
    })
    .catch((err) => {
      next(err);
    });
});

// Gets Instructor profile (using sesson id)
router.get("/profile", isClient, (req, res, next) => {
  User.findById(req.session.user._id)
    .then((instructorDetails) => {
      res.render("instructors/instructor-profile.hbs", {
        instructor: instructorDetails,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// Edit users profiles
router.get("/profile/edit", isClient, (req, res, next) => {
  User.findById(req.session.user._id)
    .then((instructorDetails) => {
      res.render("instructors/instructor-profile-edit.hbs", {
        instructor: instructorDetails,
      });
    })
    .catch((err) => {
      next(err);
    });
});

//Makes the edit
router.post(
  "/profile/edit",
  cloudinary.single("file"),
  isClient,
  (req, res, next) => {
    let user = req.session.user;
    let imageInfo;

    if (req.file !== undefined) {
      imageInfo = req.file.path;
    } else if (req.file === undefined) {
      imageInfo = user.image;
    }
    let updatedDetails = {
      userName: req.body.userName,
      email: req.body.email,
      image: imageInfo,
      about: req.body.about,
      role: req.body.role,
    };
    User.findByIdAndUpdate(req.session.user._id, updatedDetails)
      .then((response) => {
        res.redirect("/instructor/profile");
      })
      .catch((err) => {
        next(err);
      });
  }
);

// Instructor's client list (gathered using param id)
router.get("/:instructorId/client-list", isClient, (req, res, next) => {
  User.findById(req.params.instructorId, { new: true })
    .populate("clients")
    .then((instructorDetails) => {
      res.render("instructors/clients-list.hbs", {
        clients: instructorDetails.clients,
      });
    });
});

//Workouts
router.get("/:instructorId/workouts", isClient, (req, res, next) => {
  res.render("instructors/instructor-workout.hbs");
});

//Add's client to instructors database and vice versa
router.post("/:instructorId/add-client", isClient, (req, res, next) => {
  let instructorData;
  User.find({ email: req.body.email })
    .then((client) => {
      User.findByIdAndUpdate(
        req.params.instructorId,
        { $addToSet: { clients: client[0]._id } },
        { new: true }
      )
        .populate("clients")
        .then((response) => {
          instructorData = response;
          return User.findOneAndUpdate(
            { email: req.body.email },
            { $set: { instructor: req.params.instructorId } }
          );
        })
        .then((instructorDetails) => {
          res.render("instructors/instructor-homepage.hbs", {
            instructor: instructorData,
            message: "Successfully added client",
          });
        });
    })
    .catch(() => {
      return res.redirect("/instructor/homepage?msg=0");
    });
});

module.exports = router;