// routes/cashiers.js
const express = require("express");
const { body } = require("express-validator");
const {
  createCashier,
  updateCashier,
  deleteCashier,
} = require("../controllers/cashiers");
const validateRequest = require("../middleware/validateRequest");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  isAdmin,
  createCashier
);

router.put(
  "/:id",
  [
    body("username")
      .optional()
      .notEmpty()
      .withMessage("Username cannot be empty"),
    body("email").optional().isEmail().withMessage("Email must be valid"),
    body("password")
      .optional()
      .notEmpty()
      .withMessage("Password cannot be empty"),
    body("status")
      .optional()
      .isIn(["active", "disabled"])
      .withMessage("Invalid status"),
  ],
  validateRequest,
  isAdmin,
  updateCashier
);

router.delete("/delete/:id", isAdmin, deleteCashier);

module.exports = router;
