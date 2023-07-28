"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@example.com",
          password,
          role: "admin",
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
