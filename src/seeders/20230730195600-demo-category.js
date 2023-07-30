"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        { name: "Makanan", createdAt: new Date(), updatedAt: new Date() },
        { name: "Minuman", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Peralatan Rumah Tangga",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Produk Kesehatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alat Tulis Kantor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Produk Anak-Anak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Minyak Goreng dan Bumbu Masak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Produk Kebersihan Rumah Tangga",
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
