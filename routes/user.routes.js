const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTrainer = require("../middleware/isTrainer")

//Homepage
router.get("/homepage", isLoggedIn, (req, res, next) => {
    if (req.session.user.role === "Client"){
    res.redirect("clients/client-homepage")
    } else {
    res.redirect("instructors/instructor-homepage")  
    }
});

//Notes
router.get("/notes", isLoggedIn, (req, res, next) => {});

//Tasks/workout
router.get("/tasks", isLoggedIn, (req, res, next) => {});









module.exports = router;
