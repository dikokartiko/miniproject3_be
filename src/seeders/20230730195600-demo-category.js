"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Makanan",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Minuman",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Peralatan Rumah Tangga",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Produk Kesehatan",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alat Tulis Kantor",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Produk Anak-Anak",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Minyak Goreng dan Bumbu Masak",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Produk Kebersihan Rumah Tangga",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
