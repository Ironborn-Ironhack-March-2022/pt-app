module.exports = (req, res, next) => {
  if (req.session.user.role === "Trainer") {
    return res.redirect("/client/homepage", {
      errorMessage: "You do not have access to this account.",
    });
  }
  req.user = req.session.user;
  next();
};

// I don't think this is gonna be necessary
