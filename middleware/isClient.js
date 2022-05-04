module.exports = (req, res, next) => {
  if (req.session.user.role === "Client") {
    return res.redirect(401, "/clients/homepage");
  } else {
    req.user = req.session.user;
    next();
  }
};
