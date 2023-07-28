// routes/auth.js
const express = require("express");
const { param, body, header } = require("express-validator");
const {
  login,
  resetPassword,
  handleResetPassword,
  loginCashier,
  resetPasswordCashier,
  handleResetPasswordCashier,
} = require("../controllers/auth");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  login
);

router.post(
  "/reset-password",
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  resetPassword
);

router.post(
  "/reset-password/:token",
  [
    param("token").notEmpty().withMessage("Token is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords must match"),
  ],
  validateRequest,
  handleResetPassword
);

router.post(
  "/cashiers/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  loginCashier
);

router.post(
  "/cashiers/reset-password",
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  resetPasswordCashier
);

router.post(
  "/cashiers/reset-password",
  [
    header("Authorization")
      .notEmpty()
      .withMessage("Authorization header is required")
      .custom((value) => value.startsWith("Bearer "))
      .withMessage(
        'Authorization header must be in the format "Bearer <token>"'
      ),
    body("password").notEmpty().withMessage("Password is required"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords must match"),
  ],
  validateRequest,
  handleResetPasswordCashier
);

module.exports = router;
