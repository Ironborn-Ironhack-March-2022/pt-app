const router = require("express").Router();

const Client = require("../models/Client.model");
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isClient = require("../middleware/isClient");

module.exports = router;

//Homepage
router.get("/homepage", isLoggedIn, isClient,(req, res, next) => {
    res.render("clients/client-homepage");
});

//Profile
router.get("/profile/", isLoggedIn, isClient, (req, res, next) => {
    console.log(req.session.user.id)
    res.render("clients/client-profile");
});

//Tasks-list
router.get("/tasks", isLoggedIn, isClient, (req, res, next) => {
    res.render("clients/client-tasks");
});

//Exercise-list
router.get("/exercises", isLoggedIn, isClient, (req, res, next) => {
    res.render("clients/exercises-list");
});

