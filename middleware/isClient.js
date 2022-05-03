module.exports = (req, res, next) => {
  if (req.session.user.role === "Instructor") {
    res.redirect(401, "/instructor/homepage");
  } else {
    req.user = req.session.user;
    next();
  }
};
