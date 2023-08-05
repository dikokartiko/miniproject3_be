// controllers/auth.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Status } = require("../models");
const createTransporter = require("../helpers/email");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username },
      include: Status,
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (user.Status.name !== "active") {
      return res.status(400).send({ error: "User is not active" });
    }
    if (!(await user.validPassword(password))) {
      return res.status(400).send({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while logging in" });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Click this link to reset your password: ${process.env.URL}/tupo-dashboard#/auth/resetPassword/${token}`,
    });
    res.send({ message: "Password reset email sent" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while resetting the password" });
  }
};

exports.handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).send({ error: "User not found" });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send({ message: "Password updated successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).send({ error: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).send({ error: "Invalid token" });
    }
    res
      .status(500)
      .send({ error: "An error occurred while resetting the password" });
  }
};

exports.getUserData = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).send({ error: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).send({ error: "Invalid token" });
    }
    res
      .status(500)
      .send({ error: "An error occurred while getting user data" });
  }
};
