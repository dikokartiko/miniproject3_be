const { User, Product } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all users and products
    const users = await User.findAll();
    const products = await Product.findAll();

    // Set start and end dates for this year
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);

    // Generate random transactions
    let transactions = [];
    for (let i = 0; i < 100; i++) {
      const cashierId = users[Math.floor(Math.random() * users.length)].id;
      const date = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;
      const pricePerProduct = product.price;
      const totalPrice = pricePerProduct * quantity;

      transactions.push({
        cashierId,
        date,
        productId: product.id,
        quantity,
        pricePerProduct,
        totalPrice,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Transactions", transactions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
