// routes/products.js
const express = require("express");
const { body, param } = require("express-validator");
const {
  createProduct,
  updateProduct,
  getProducts,
} = require("../controllers/products");
const validateRequest = require("../middleware/validateRequest");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");

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
    body("statusId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Status ID must be a positive integer"),
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
    body("statusId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Status ID must be a positive integer"),
  ],
  validateRequest,
  isAdmin,
  upload.single("image"),
  updateProduct
);

router.get("/", authenticate, getProducts);
module.exports = router;
