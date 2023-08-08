const { Transaction, Product, Report } = require("../models");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

exports.generateSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body; // Change this line

    // Query transactions within date range
    const transactions = await Transaction.findAll({
      where: {
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      include: Product,
    });

    // Create report
    for (const transaction of transactions) {
      await Report.create({
        cashierId: transaction.cashierId,
        startDate,
        endDate,
        productId: transaction.productId,
        productName: transaction.Product.name,
        quantity: transaction.quantity,
        pricePerProduct: transaction.pricePerProduct,
        totalPrice: transaction.totalPrice,
      });
    }

    res.send({ message: "Sales report generated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while generating the sales report" });
  }
};

exports.getSalesReport = async (req, res) => {
  try {
    // Query reports from database
    const reports = await Report.findAll();

    // Return reports
    res.send(reports);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while getting the sales report" });
  }
};
