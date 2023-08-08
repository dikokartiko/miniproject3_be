//controller/sales
const { Transaction, Cart, Product } = require("../models");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

//refactor
const getWhereClause = (startDate, endDate) => {
  let whereClause = {};
  if (startDate && endDate) {
    whereClause.date = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }
  return whereClause;
};

const generateReport = (transactions) => {
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
  return report;
};

exports.getSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const whereClause = getWhereClause(startDate, endDate);
    const transactions = await Transaction.findAll({
      where: whereClause,
      include: Product,
    });
    const report = generateReport(transactions);
    res.send(report);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while generating the sales report" });
  }
};
