let UserModel = require("../models/User");
const { validationResult } = require("express-validator");
exports.login = (req, res) => {
  res.render("auth/login", { layout: "auth" });
};

exports.register = (req, res) => {
  res.render("auth/register", { layout: "auth", errors: req.flash("errors") });
};

exports.admin = (req, res) => {
  res.render("admin/admin");
};

exports.store = (req, res) => {
  // Identifica si hubieron errores en el request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si los hubieron entonces regresa a la petición anterior
    //Flash es una variable de sesion, una vez que se lee se elimina
    req.flash("errors", errors.array());
    return res.redirect("back");
  }

  let user = {
    name: req.body.inputName,
    email: req.body.inputEmail,
    password: req.body.inputPassword,
    role: req.body.role,
  };

  UserModel.create(user)
    .then((id) => {
      console.log("Exitooo");
      return res.send("Usuario creado");
    })
    .catch((error) => {
      console.log(error);
    });
};
