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
    return res.status(403).render();
  }
  next();
};

exports.canViewDashboard = (req, res, next) => {
  if (req.user.role == "Admin" || req.user.role == "Normal") {
    next();
  } else {
    res.status(403);
    return res.send("Not authorized");
  }
};
