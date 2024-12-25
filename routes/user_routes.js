const userController = require("../controller/user_controller");

const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name").isEmpty().not(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  userController.signup
);
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  userController.login
);

module.exports = router;
