const express = require("express");
const router = express.Router();
const { getSales } = require("../controllers/sales");
const isAdmin = require("../middleware/isAdmin");

router.get("/", isAdmin, getSales);

module.exports = router;
