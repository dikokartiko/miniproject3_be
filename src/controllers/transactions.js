// controllers/transactions.js
const { Transaction, Cart, Product } = require("../models");

exports.createTransaction = async (req, res) => {
  const { amount } = req.body;
  const cashierId = req.userId;

  try {
    // Get cart items
    const cartItems = await Cart.findAll({
      where: { cashierId, transactionId: null },
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

    // Update cart items with transaction ID
    for (const item of cartItems) {
      item.transactionId = transaction.id;
      await item.save();

      // Decrease item count in Product model
      const product = await Product.findByPk(item.productId);
      if (product && product.item) {
        product.item -= item.quantity;
        await product.save();
      }
    }

    // Delete cart items
    await Cart.destroy({ where: { cashierId, transactionId: null } });

    res.status(201).send({ transaction, change });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the transaction" });
  }
};
