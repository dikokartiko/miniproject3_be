"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name from Roles;`
    );
    const rolesRow = roles[0];
    const adminRole = rolesRow.find((role) => role.name === "admin");
    const cashierRole = rolesRow.find((role) => role.name === "cashier");

    const password = await bcrypt.hash("password", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "dicco",
          email: "dikowebdev@gmail.com",
          password: password,
          status: "active",
          roleId: adminRole.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "ivon",
          email: "ivon@example.com",
          password: password,
          status: "active",
          roleId: cashierRole.id,
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
