const router = require("express").Router();

const Client = require("../models/Client.model");
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isClient = require("../middleware/isClient");

module.exports = router;

//Homepage
router.get("/homepage", (req, res, next) => {
  User.findById(req.session.user._id)
  .then((clientDetails) => {
    res.render("clients/client-homepage", { client: clientDetails });
  })
  .catch((err) => {
    next(err);
  })
});

//Profile
router.get("/profile", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((clientDetails) => {
      res.render("clients/client-profile", { client: clientDetails });
    })
    .catch((err) => {
      next(err);
    });
});

//Tasks-list
router.get("/tasks", isLoggedIn, isClient, (req, res, next) => {
  User.findById(req.session.user._id).then((clientDetails) => {
    res.render("clients/client-tasks", clientDetails);
  });
});

//Exercise-list
router.get("/exercises", isLoggedIn, isClient, (req, res, next) => {
  res.render("clients/exercises-list");
});

//Client-day
router.get("/:clientid/client-day", isLoggedIn, isClient, (req, res, next) => {
  User.findById(req.session.user._id).then((clientDetails) => {
    res.render("clients/client-day", clientDetails);
  });
});
