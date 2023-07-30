// routes/cashiers.js
const express = require("express");
const { body } = require("express-validator");
const {
  createCashier,
  updateCashier,
  deleteCashier,
  getCashiers,
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
    body("statusId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Status ID must be a positive integer"),
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
    body("statusId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Status ID must be a positive integer"),
  ],
  validateRequest,
  isAdmin,
  updateCashier
);

router.get("/", isAdmin, getCashiers);
router.delete("/delete/:id", isAdmin, deleteCashier);

module.exports = router;
