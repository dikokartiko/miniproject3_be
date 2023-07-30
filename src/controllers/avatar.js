// controllers/avatar.js
const path = require("path");
const { User } = require("../models");

exports.updateProfilePicture = async (req, res) => {
  const id = req.userId;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.avatar = req.file.path;
    await user.save();
    res.send({ message: "Profile picture updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating the profile picture" });
  }
};

exports.getProfilePicture = async (req, res) => {
    const id = req.userId;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (!user.avatar) {
      return res.status(404).send({ error: "Profile picture not found" });
    }

    res.sendFile(path.resolve(user.avatar));
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting the profile picture" });
  }
};
