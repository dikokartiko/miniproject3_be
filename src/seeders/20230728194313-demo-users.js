"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password", salt);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Dicco",
          password,
          email: "dikowebdev@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "ivon",
          password,
          email: "dimasivonanggitama@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
