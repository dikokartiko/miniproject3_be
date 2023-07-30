// routes/categories.js
const express = require("express");
const { body } = require("express-validator");
const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const validateRequest = require("../middleware/validateRequest");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

//create
router.post(
  "/",
  [body("name").notEmpty().withMessage("Name is required")],
  validateRequest,
  isAdmin,
  createCategory
);

// update
router.put(
  "/:id",
  [body("name").optional().notEmpty().withMessage("Name cannot be empty")],
  validateRequest,
  isAdmin,
  updateCategory
);

//delete
router.delete("/:id", isAdmin, deleteCategory);

module.exports = router;
