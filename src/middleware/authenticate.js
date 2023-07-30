// middleware/authenticate.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: "Missing authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
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
      .send({ error: "An error occurred while checking authentication" });
  }
};

module.exports = authenticate;
