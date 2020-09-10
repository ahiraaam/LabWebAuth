let router = require("express").Router();
let homepageController = require("../controllers/HomepageController");
let authController = require("../controllers/AuthController");
let pagesController = require("../controllers/PagesController");
let authValidator = require("../validators/AuthValidators");
let passport = require("passport");
const { session } = require("passport");
let middleweare = require("../middleware/authentication");

router.get("/", middleweare.checkAuthenticated, homepageController.index);

// Authentication routes
router.get("/login", middleweare.checkNotAuthenticated, authController.login);
router.get(
  "/register",
  middleweare.checkNotAuthenticated,
  authController.register
);

router.post("/register", authValidator.store, authController.store);
router.delete("/logout", authController.logout);
//Lista de Usuarios
router.get(
  "/users",
  middleweare.checkAuthenticated,
  middleweare.canViewUsers,
  pagesController.admin
);
//Dashboard
router.get(
  "/dashboard",
  middleweare.checkAuthenticated,
  middleweare.canViewDashboard,
  pagesController.dashboard
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-fail",
    successRedirect: "/protected",
  })
);

router.get("/protected", (req, res) => {
  console.log(req.user);
  res.send("Usuario logueado con éxito");
});

router.get("/login-fail", (req, res) => {
  res.send("El usuario no tiene una sesión válida");
});

module.exports = router;
