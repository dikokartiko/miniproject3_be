"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash("password", 10);
    await queryInterface.bulkInsert("Users", [
      {
        username: "dicco",
        email: "dikowebdev@gmail.com",
        password,
        roleId: 1,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "ivon",
        email: "dimasivonanggitam@gmail.com",
        password,
        roleId: 2,
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "bryan",
        email: "bryankarta@gmail.com",
        password,
        roleId: 1,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "paijo",
        email: "paijo@gmail.com",
        password,
        roleId: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "diko",
        email: "rkodiko@gmail.com",
        password,
        roleId: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "rian",
        email: "riandi@gmail.com",
        password,
        roleId: 2,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
