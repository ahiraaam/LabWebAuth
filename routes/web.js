let router = require("express").Router();
let homepageController = require("../controllers/HomepageController");
let authController = require("../controllers/AuthController");
let authValidator = require("../validators/AuthValidators");
let passport = require("passport");
const { session } = require("passport");
let middleweare = require("../middleware/authentication");

router.get("/", middleweare.checkAuthenticated, homepageController.index);

// Authentication routes
router.get("/login", middleweare.checkNotAuthenticated, authController.login);
router.get("/register", authController.register);

router.post("/register", authValidator.store, authController.store);

router.get(
  "/users",
  middleweare.checkAuthenticated,
  middleweare.canViewUsers,
  authController.admin
);

router.get(
  "/dashboard",
  middleweare.checkAuthenticated,
  middleweare.canViewDashboard,
  homepageController.dashboard
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
