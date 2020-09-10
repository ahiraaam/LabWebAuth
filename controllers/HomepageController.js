exports.index = (req, res) => {
  res.render("homepage/index");
  console.log(req.user);
};

exports.dashboard = (req, res) => {
  res.render("homepage/dashboard");
};
