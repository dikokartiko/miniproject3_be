// controllers/cashiers.js
const bcrypt = require("bcrypt");
const { User, Role } = require("../models");

exports.createCashier = async (req, res) => {
  const { username, email, password, status } = req.body;

  try {
    const cashier = await User.create({
      username,
      email,
      password,
      roleId: 2,
      status,
    });
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
    if (password) {
      const salt = await bcrypt.genSalt(10);
      cashier.password = await bcrypt.hash(password, salt);
    }
    if (status !== undefined) cashier.status = status;

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

exports.getCashiers = async (req, res) => {
  const { status } = req.query;
  try {
    let whereClause = { roleId: 2 };
    if (status) {
      whereClause.status = status;
    }

    const cashiers = await User.findAll({
      where: whereClause,
      include: [Role],
    });

    res.send(cashiers);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting the cashiers" });
  }
};

exports.getallCashiers = async (req, res) => {
  try {
    const cashiers = await User.findAll({
      where: { roleId: 2 },
      include: Role,
    });
    res.send(cashiers);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting the cashiers" });
  }
};
