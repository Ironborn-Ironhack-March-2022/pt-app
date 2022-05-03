const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTrainer = require("../middleware/isTrainer")

//Homepage
router.get("/homepage", isLoggedIn, (req, res, next) => {
    if (req.session.user.role === "Client"){
    User.findById(req.session.user._id) 
    .then(user =>
    res.render("clients/client-homepage", user)
    )} else {
    User.findById(req.session.user._id)  
    .then(user =>
    res.render("instructors/client-homepage", user)  
    )}
});

//Notes
router.get("/notes", isLoggedIn, (req, res, next) => {});

//Tasks/workout
router.get("/tasks", isLoggedIn, (req, res, next) => {});









module.exports = router;
