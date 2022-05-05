const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTrainer = require("../middleware/isTrainer");
const { route } = require("./workouts.routes");


//display favourites-list
router.get("/favorites", isLoggedIn, (req, res,next) => {
    User.findById(req.session.user._id)
    .populate("favorites")
    .then(userDetails => {
        res.render("exercises/exercises-favorites", {user: userDetails.favorites});
    })
    .catch(err => {console.log("error getting favorites for db", err)
next(err)
})
})









module.exports = router;
