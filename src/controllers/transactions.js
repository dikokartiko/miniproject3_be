// controllers/transactions.js
const { Transaction, Cart, Product } = require("../models");

exports.createTransaction = async (req, res) => {
  const { amount, items } = req.body;
  const cashierId = req.userId;

  try {
    // Get cart items
    const cartItems = await Cart.findAll({
      where: { cashierId },
      include: Product,
    });

    // Calculate total price
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.totalPrice;
    }

    if (totalPrice === 0) {
      return res.status(400).send({ error: "cart cant be empty" });
    }
    // Check if amount is sufficient
    if (amount < totalPrice) {
      return res.status(400).send({ error: "Insufficient amount" });
    }

    // Calculate change
    const change = amount - totalPrice;

    // Create transaction
    const transaction = await Transaction.create({
      cashierId,
      date: new Date(),
      totalPrice,
      amount,
      change,
    });

    // Create transaction items
    for (const item of items) {
      const { productId, quantity, pricePerProduct, totalPrice } = item;
      await TransactionItem.create({
        transactionId: transaction.id,
        productId,
        quantity,
        pricePerProduct,
        totalPrice,
      });
    }

    // Delete cart items
    await Cart.destroy({ where: { cashierId } });

    res.status(201).send({ transaction, change });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    // Retrieve all transactions from database
    const transactions = await Transaction.findAll({
      include: [
        {
          model: TransactionItem,
          include: Product,
        },
      ],
    });

    // Return transaction data
    res.send(transactions);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting transaction data" });
  }
};
