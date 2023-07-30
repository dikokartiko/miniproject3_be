// controllers/cashiers.js
const { User } = require("../models");

exports.createCashier = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const cashier = await User.create({ username, email, password, roleId: 2 });
    res.status(201).send(cashier);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send({ error: "Username or email already taken" });
    }
    res
      .status(500)
      .send({ error: "An error occurred while creating the cashier" });
  }
};

exports.updateCashier = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, status } = req.body;

  try {
    const cashier = await User.findByPk(id);
    if (!cashier) {
      return res.status(404).send({ error: "Cashier not found" });
    }

    if (username) cashier.username = username;
    if (email) cashier.email = email;
    if (password) cashier.password = password;
    if (status) cashier.status = status;

    await cashier.save();
    res.send(cashier);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send({ error: "Username or email already taken" });
    }
    res
      .status(500)
      .send({ error: "An error occurred while updating the cashier" });
  }
};

exports.deleteCashier = async (req, res) => {
  const { id } = req.params;

  try {
    const cashier = await User.findByPk(id);
    if (!cashier) {
      return res.status(404).send({ error: "Cashier not found" });
    }

    await cashier.destroy();
    res.send({ message: "Cashier deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the cashier" });
  }
};
