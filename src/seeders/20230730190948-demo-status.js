"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Statuses",
      [
        { name: "active", createdAt: new Date(), updatedAt: new Date() },
        { name: "inactive", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Statuses", null, {});
  },
};
