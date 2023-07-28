// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use(require("./routes"));

// Sync database
sequelize.sync({ alter: true });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
