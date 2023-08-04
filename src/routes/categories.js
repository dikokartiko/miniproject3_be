// routes/categories.js
const express = require("express");
const { body } = require("express-validator");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/categories");
const validateRequest = require("../middleware/validateRequest");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

//create
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("statusId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Status ID must be a positive integer"),
  ],
  validateRequest,
  isAdmin,
  createCategory
);

// update
router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("statusId")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Status ID must be a positive integer"),
  ],
  validateRequest,
  isAdmin,
  updateCategory
);

//delete
router.delete("/:id", isAdmin, deleteCategory);

router.get("/all", isAdmin, getAllCategories);
module.exports = router;
