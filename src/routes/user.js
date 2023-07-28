const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Email is invalid"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  userController.createCashier
);

router.put(
  "/:id",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Email is invalid"),
  ],
  userController.updateCashier
);

router.delete("/:id", userController.deleteCashier);

router.patch("/:id/disable", userController.disableCashier);

module.exports = router;
