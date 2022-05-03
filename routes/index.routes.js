const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {user: req.session.user});
});

router.get("/homepage", isLoggedIn, (req, res, next) => {
  if (!req.session.user.role === "Client") {
    return res.redirect("/client/homepage");
  } else if (req.session.user.role === "Instructor") {
    return res.redirect("/instructor/homepage");
  }
});

module.exports = router;
