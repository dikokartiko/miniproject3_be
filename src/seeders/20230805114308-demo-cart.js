"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Carts",
      [
        {
          productId: 1,
          quantity: 2,
          totalPrice: 20.0,
          cashierId: 1,
          transactionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 2,
          quantity: 3,
          totalPrice: 30.0,
          cashierId: 2,
          transactionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 3,
          quantity: 4,
          totalPrice: 40.0,
          cashierId: 3,
          transactionId: 3,
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
