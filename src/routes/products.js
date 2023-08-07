// routes/products.js
const express = require("express");
const { body, param } = require("express-validator");
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductImage,
} = require("../controllers/products");
const validateRequest = require("../middleware/validateRequest");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// create products
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    body("categoryId")
      .isInt({ gt: 0 })
      .withMessage("Category ID must be a positive integer"),
    body("status")
      .optional()
      .isBoolean()
      .withMessage("status must be a boolean value"),
  ],
  // validateRequest,
  isAdmin,
  upload.single("image"),
  createProduct
);

// updates product
router.put(
  "/:id",
  [
    param("id").isInt({ gt: 0 }).withMessage("ID must be a positive integer"),
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    body("categoryId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Category ID must be a positive integer"),
    body("status")
      .optional()
      .isBoolean()
      .withMessage("status must be a boolean value"),
  ],
  validateRequest,
  isAdmin,
  upload.single("image"),
  updateProduct
);

router.get("/", authenticate, getProducts);

router.get("/image/:productId", getProductImage);

module.exports = router;
