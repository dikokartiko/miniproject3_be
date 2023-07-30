// middleware/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    cb(null, randomNumber + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".gif") {
      return cb(new Error("Only .jpg, .png and .gif files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
