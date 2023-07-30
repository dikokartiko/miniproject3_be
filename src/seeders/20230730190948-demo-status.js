"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Statuses", [
      { name: "active", createdAt: new Date(), updatedAt: new Date() },
      { name: "disabled", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Statuses", null, {});
  },
};
