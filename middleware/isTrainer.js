module.exports = (req, res, next) => {
    if(req.session.user.role === "Client"){
      return res.render("auth/login", 
      {errorMessage: "You do not have access to this account."})
    }
    req.user = req.session.user;
    next();
  }