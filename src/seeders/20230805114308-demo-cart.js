"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Carts",
      [
        {
          productId: 1,
          quantity: 1,
          price: 3000,
          totalPrice: 3000,
          cashierId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 2,
          quantity: 5,
          price: 3000,
          totalPrice: 3000,
          cashierId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Carts", null, {});
  },
};
