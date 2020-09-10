exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/register");
  }
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

exports.canViewUsers = (req, res, next) => {
  if (req.user.role != "Admin") {
    return res.send("Not allowed");
  }
  next();
};

exports.canViewDashboard = (req, res, next) => {
  if (req.user.role == "Admin" || req.user.role == "Normal") {
    next();
  } else {
    res.status(401);
    return res.send("NO PUEDES ENTRAR");
  }
};
