// routes/index.js
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/cashiers", require("./cashiers"));
router.use("/categories", require("./categories"));
module.exports = router;
