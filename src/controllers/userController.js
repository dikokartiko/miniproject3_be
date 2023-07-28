const { validationResult } = require("express-validator");

const { User } = require("../models/user");

exports.createCashier = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateCashier = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.username = username;
  user.email = email;
  if (password) {
    user.password = password;
  }

  try {
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteCashier = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  await user.destroy();
  res.json({ message: "User deleted" });
};

exports.disableCashier = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.status = "disabled";

  try {
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};
