exports.index = (req, res) => {
  res.render("homepage/index", { user: req.user });
};
