"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password", salt);

    await queryInterface.bulkInsert(
      "Cashiers",
      [
        {
          username: "testcashier",
          email: "rkodiko@gmail.com",
          password,
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "kasir",
          email: "rkokartiko@gmail.com",
          password,
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cashiers", null, {});
  },
};
