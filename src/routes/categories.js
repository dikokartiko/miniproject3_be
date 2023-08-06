const express = require("express");
const { body } = require("express-validator");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesByStatus,
} = require("../controllers/categories");
const validateRequest = require("../middleware/validateRequest");
const isAdmin = require("../middleware/isAdmin");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

//create
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("status")
      .optional()
      .isBoolean()
      .withMessage("Status must be a boolean value"),
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
    body("status")
      .optional()
      .isBoolean()
      .withMessage("Status must be a boolean value"),
  ],
  validateRequest,
  isAdmin,
  updateCategory
);

//delete
router.delete("/:id", isAdmin, deleteCategory);

router.get("/all", authenticate, getAllCategories);
router.get("/", authenticate, getCategoriesByStatus);

module.exports = router;
