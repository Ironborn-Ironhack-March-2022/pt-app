module.exports = (req, res, next) => {
  if (req.session.user.role === "Client") {
    return res.redirect("/client/homepage?msg=0");
  } else {
    req.user = req.session.user;
    next();
  }
};
