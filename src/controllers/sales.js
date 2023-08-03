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
      include: [
        {
          model: Cart,
          include: Product,
        },
      ],
    });

    // Aggregate sales data by date
    let salesData = {};
    for (const transaction of transactions) {
      const date = transaction.date.toISOString().split("T")[0];
      if (!salesData[date]) {
        salesData[date] = 0;
      }
      salesData[date] += transaction.totalPrice;
    }

    // Convert sales data to array of objects
    salesData = Object.entries(salesData).map(([date, totalPrice]) => ({
      date,
      totalPrice,
    }));
    console.log(salesData);
    // Return sales data
    res.send(salesData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while getting sales data" });
  }
};
