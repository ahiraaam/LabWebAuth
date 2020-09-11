let UserModel = require("../models/User");

exports.dashboard = (req, res) => {
  res.render("users/dashboard");
};

exports.admin = (req, res) => {
  UserModel.getUsers().then((users) => {
    console.log(users);
    return res.render("admin/users", { users: users });
  });
};

exports.getUser = (req, res) => {
  let id = req.params.id;
  UserModel.getUser(id).then((user) => {
    if (user == null) {
      res.status(404).send("Not found");
      return;
    }
    res.render("users/profile", { user: user });
  });
};
