const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/login",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

router.post("/reset-password-request", authController.resetPasswordRequest);

router.post(
  "/reset-password/:token",
  [check("password").notEmpty().withMessage("Password is required")],
  authController.resetPassword
);

module.exports = router;
