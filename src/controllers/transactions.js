// controllers/transactions.js
const { Transaction, Cart, Product } = require("../models");

const getCartItems = async (cashierId) => {
  return await Cart.findAll({
    where: { cashierId },
    include: Product,
  });
};

const calculateTotalPrice = (cartItems) => {
  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.totalPrice;
  }
  return totalPrice;
};

const createTransaction = async (cashierId, amount, totalPrice, cartItems) => {
  const change = amount - totalPrice;
  for (const item of cartItems) {
    await Transaction.create({
      cashierId,
      date: new Date(),
      totalPrice,
      amount,
      change,
      productId: item.productId,
      quantity: item.quantity,
      pricePerProduct: item.price,
      totalPrice: item.totalPrice,
    });
    const product = await Product.findByPk(item.productId);
    product.stock -= item.quantity;
    await product.save();
  }
};

exports.createTransaction = async (req, res) => {
  const { amount } = req.body;
  const cashierId = req.userId;
  try {
    const cartItems = await getCartItems(cashierId);
    const totalPrice = calculateTotalPrice(cartItems);

    if (totalPrice === 0) {
      return res.status(400).send({ error: "cart cant be empty" });
    }
    if (amount < totalPrice) {
      return res.status(400).send({ error: "Insufficient amount" });
    }

    await createTransaction(cashierId, amount, totalPrice, cartItems);
    await Cart.destroy({ where: { cashierId } });

    res.status(201).send({ transaction: cartItems, change });
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
          model: Product,
        },
      ],
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
    res
      .status(500)
      .send({ error: "An error occurred while generating the sales report" });
  }
};
