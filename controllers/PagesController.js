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
