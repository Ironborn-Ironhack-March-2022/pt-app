module.exports = (req, res, next) => {
  if (req.session.user.role === "Client") {
    res.redirect("/instructor/homepage");
  } else {
    req.user = req.session.user;
    next();
  }
};
