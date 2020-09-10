//Validaciones del sistema
// validators/AuthValidator.js
// Importamos express-validators para ayudarnos a implementar las reglas
// de validación
const { check } = require("express-validator");

// Escribimos las reglas de validación para la acción register
exports.store = [
  // Revisa que el nombre no sea vacío
  check("inputName").notEmpty(),
  // Revisa que el correo sea un mail
  check("inputEmail").isEmail(),
  // Revisa que el password este definido
  check("inputPassword").notEmpty(),
  // Revisa que el password sea el mismo
  check("inputPassword").custom((value, { req, loc, path }) => {
    if (value !== req.body.confirm_password) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  }),
];
