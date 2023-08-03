// routes/carts.js
const express = require("express");
const { body, param } = require("express-validator");
const { addToCart, updateCart, getCart } = require("../controllers/carts");
const validateRequest = require("../middleware/validateRequest");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post(
  "/",
  [
    body("items").isArray().withMessage("Items must be an array"),
    body("items.*.productId")
      .isInt({ gt: 0 })
      .withMessage("Product ID must be a positive integer"),
    body("items.*.quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be a positive integer"),
  ],
  validateRequest,
  authenticate,
  addToCart
);

router.put(
  "/",
  [
    body("items").isArray().withMessage("Items must be an array"),
    body("items.*.id")
      .isInt({ gt: 0 })
      .withMessage("ID must be a positive integer"),
    body("items.*.quantity")
      .isInt({ gte: 0 })
      .withMessage("Quantity must be a non-negative integer"),
    body("items.*.productId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Product ID must be a positive integer"),
  ],
  validateRequest,
  authenticate,
  updateCart
);

router.get("/", authenticate, getCart);

module.exports = router;
