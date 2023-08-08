// controllers/carts.js
const { Cart, Product } = require("../models");

exports.addToCart = async (req, res) => {
  const { items } = req.body;
  const cashierId = req.userId;
  try {
    for (const item of items) {
      const { productId, quantity } = item;
      const product = await Product.findByPk(productId);
      if (!product || !product.status)
        return res
          .status(404)
          .send({ error: "Product not found or not active" });
      if (product.stock < quantity)
        return res.status(400).send({ error: "Insufficient stock" });
      const totalPrice = product.price * quantity;
      let cartItem = await Cart.findOne({
        where: { productId, cashierId },
      });
      if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.totalPrice += totalPrice;
        cartItem.isChecked = false;
        await cartItem.save();
      } else {
        cartItem = await Cart.create({
          productId,
          quantity,
          price: product.price,
          totalPrice,
          cashierId,
          isChecked: false,
        });
      }
    }
    res.status(201).send({ message: "Items added to cart successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while adding to the cart" });
  }
};

// refactor
exports.updateCart = async (req, res) => {
  const { items } = req.body;
  const cashierId = req.userId;
  try {
    for (const item of items) {
      const { id, quantity, isChecked } = item;
      const cartItem = await Cart.findOne({
        where: { id, cashierId },
        include: Product,
      });
      if (!cartItem) {
        return res.status(404).send({ error: "Cart item not found" });
      }
      if (quantity === 0) {
        // Delete cart item
        await cartItem.destroy();
      } else {
        // Update quantity, total price, and isChecked
        cartItem.quantity = quantity;
        cartItem.totalPrice = cartItem.price * quantity;
        if (isChecked !== undefined) cartItem.isChecked = isChecked;
        await cartItem.save();
      }
    }
    res.send({ message: "Cart items updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the cart" });
  }
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  const cashierId = req.userId;
  try {
    const cartItem = await Cart.findOne({
      where: { id, cashierId },
      include: Product,
    });
    if (!cartItem) {
      return res.status(404).send({ error: "Cart item not found" });
    } else {
      await cartItem.destroy();
    }
    res.send({ message: "Cart items delete successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the cart" });
  }
};

exports.getCart = async (req, res) => {
  const cashierId = req.userId;
  console.log(cashierId, "inicashier");
  try {
    const cartItems = await Cart.findAll({
      where: { cashierId, isChecked: false },
      include: Product,
    });
    res.send(cartItems);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while getting the cart" });
  }
};
