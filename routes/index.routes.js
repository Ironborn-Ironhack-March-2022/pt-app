const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { user: req.session.user, layout: false });
});

router.get("/homepage", isLoggedIn, (req, res, next) => {
  if (req.session.user.role === "client") {
    return res.redirect("/client/homepage");
  } else if (req.session.user.role === "instructor") {
    return res.redirect("/instructor/homepage");
  }
});

router.get("/workout", isLoggedIn, (req, res, next) => {
  const userId = req.session.user._id;
  if (req.session.user.role === "client") {
    return res.redirect(`/client/${userId}/workout`);
  } else if (req.session.user.role === "instructor") {
    return res.redirect(`/instructor/${userId}/workouts`);
  }
});

//Get day
router.get("/day", (req, res, next) => {
  res.render("clients/client-day");
});

module.exports = router;
