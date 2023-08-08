const express = require("express");
const router = express.Router();
const {
  generateSalesReport,
  getSalesReport,
} = require("../controllers/report");
const isAdmin = require("../middleware/isAdmin");

router.post("/", isAdmin, generateSalesReport); // Change this line
router.get("/report", isAdmin, getSalesReport);

module.exports = router;
