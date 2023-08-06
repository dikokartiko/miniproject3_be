//controller/sales
const { Transaction, Cart, Product } = require("../models");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

exports.getSales = async (req, res) => {
  try {
    // Get query parameters for date range
    const { startDate, endDate } = req.query;

    // Build where clause for date range
    let whereClause = {};
    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    // Retrieve sales data from database
    const transactions = await Transaction.findAll({
      where: whereClause,
      include: Product,
    });

    // Create sales report
    let report = [];
    for (const transaction of transactions) {
      let transactionData = {
        date: transaction.date,
        cashierId: transaction.cashierId,
        totalPrice: transaction.totalPrice,
        amount: transaction.amount,
        change: transaction.change,
        product: {
          name: transaction.Product.name,
          quantity: transaction.quantity,
          pricePerProduct: transaction.pricePerProduct,
          totalPrice: transaction.totalPrice,
        },
      };
      report.push(transactionData);
    }

    // Return sales report
    res.send(report);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while generating the sales report" });
  }
};
