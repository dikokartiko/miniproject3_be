const express = require("express");
const { body } = require("express-validator");
const { createTransaction } = require("../controllers/transactions");
const validateRequest = require("../middleware/validateRequest");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post(
  "/",
  [
    body("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be a positive number"),
  ],
  validateRequest,
  authenticate,
  createTransaction
);

module.exports = router;
