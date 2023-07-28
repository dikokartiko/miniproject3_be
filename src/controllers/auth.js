// controllers/auth.js
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { User, Cashier } = require("../models");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (!(await user.validPassword(password))) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while logging in" });
  }
};

// admin reset
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

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Use this token to reset your password: ${token}`,
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
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Update password
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

exports.loginCashier = async (req, res) => {
  const { username, password } = req.body;

  try {
    const cashier = await Cashier.findOne({ where: { username } });
    if (!cashier) {
      return res.status(404).send({ error: "Cashier not found" });
    }

    if (!(await cashier.validPassword(password))) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: cashier.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ cashier, token });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while logging in" });
  }
};

exports.resetPasswordCashier = async (req, res) => {
  const { email } = req.body;

  try {
    const cashier = await Cashier.findOne({ where: { email } });
    if (!cashier) {
      return res.status(404).send({ error: "Cashier not found" });
    }

    const token = jwt.sign({ id: cashier.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Use this token to reset your password: ${token}`,
    });

    res.send({ message: "Password reset email sent" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while resetting the password" });
  }
};

exports.handleResetPasswordCashier = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const cashier = await Cashier.findByPk(decoded.id);
    if (!cashier) {
      return res.status(404).send({ error: "Cashier not found" });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    cashier.password = await bcrypt.hash(password, salt);
    await cashier.save();

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
