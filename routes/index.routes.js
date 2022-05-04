const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { user: req.session.user });
});

router.get("/homepage", isLoggedIn, (req, res, next) => {
  if (req.session.user.role === "Client") {
    return res.redirect("/clients/homepage");
  } else if (req.session.user.role === "Instructor") {
    return res.redirect("/instructor/homepage");
  }
});

router.get("/workout", isLoggedIn, (req, res, next) => {
  const userId = req.session.user._id
  if (req.session.user.role === "Client") {
    return res.redirect(`/clients/${userId}/workout`);
  } else if (req.session.user.role === "Instructor") {
    return res.redirect(`/instructor/${userId}/workouts`);
  }
});

module.exports = router;
