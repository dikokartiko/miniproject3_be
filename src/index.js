const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

(async () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);

    process.exit(1);
  }
})();

module.exports = app;
