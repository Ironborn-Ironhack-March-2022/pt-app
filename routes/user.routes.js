const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTrainer = require("../middleware/isTrainer")

//Homepage
router.get("/homepage", isLoggedIn, isTrainer,(req, res, next) => {
    res.render("clients/client-homepage");
});

//Profile
router.get("/profile", isLoggedIn, (req, res, next) => {});

//Tasks/workout
router.get("/tasks", isLoggedIn, (req, res, next) => {});









module.exports = router;
