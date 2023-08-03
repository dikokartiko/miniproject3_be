// routes/index.js
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/cashiers", require("./cashiers"));
router.use("/categories", require("./categories"));
router.use("/products", require("./products"));
router.use("/transactions", require("./transactions")); // Add this line
router.use("/carts", require("./carts")); // Add this line
router.use("/sales", require("./sales"));
module.exports = router;
