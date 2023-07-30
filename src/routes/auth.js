// routes/auth.js
const express = require("express");
const { param, body, header } = require("express-validator");
const {
  login,
  resetPassword,
  handleResetPassword,
} = require("../controllers/auth");
const validateRequest = require("../middleware/validateRequest");
const {
  updateProfilePicture,
  getProfilePicture,
} = require("../controllers/avatar");
const upload = require("../middleware/upload");
const authenticate = require("../middleware/authenticate");
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

router.put(
  "/profile-picture",
  authenticate,
  upload.single("avatar"),
  updateProfilePicture
);

router.get("/profile-picture", authenticate, getProfilePicture);

module.exports = router;
