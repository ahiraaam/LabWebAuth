exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/register");
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
    res.status(403);
    return res.send("No autorizado");
  }
  return next();
};

exports.canViewDashboard = (req, res, next) => {
  if (req.user.role == "Admin" || req.user.role == "Normal") {
    next();
  } else {
    res.status(403);
    return res.send("Not authorized");
  }
};

exports.canSeeProfile = (req, res, next) => {
  let id = req.params.id;
  if (req.user.id != id) {
    return res.send("Not authorized");
  }
  next();
};
