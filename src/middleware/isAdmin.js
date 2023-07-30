// middleware/isAdmin.js
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "Missing authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, { include: Role });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Check if user is an admin
    if (user.Role.name !== "admin") {
      return res.status(403).send({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).send({ error: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).send({ error: "Invalid token" });
    }
    res
      .status(500)
      .send({ error: "An error occurred while checking admin status" });
  }
};
