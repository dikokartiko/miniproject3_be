// controllers/carts.js
const { Cart, Product } = require("../models");

exports.addToCart = async (req, res) => {
  const { items } = req.body;
  const cashierId = req.userId;
  try {
    for (const item of items) {
      const { productId, quantity } = item;
      const product = await Product.findByPk(productId);
      if (!product || !product.statusId)
        return res
          .status(404)
          .send({ error: "Product not found or not active" });
      if (product.item < quantity)
        return res.status(400).send({ error: "Insufficient stock" });
      const totalPrice = product.price * quantity;
      let cartItem = await Cart.findOne({
        where: { productId, cashierId, transactionId: null },
      });
      if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.totalPrice += totalPrice;
        await cartItem.save();
      } else {
        cartItem = await Cart.create({
          productId,
          quantity,
          totalPrice,
          cashierId,
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
}; // refactor

exports.updateCart = async (req, res) => {
  const { items } = req.body;
  const cashierId = req.userId;
  try {
    for (const item of items) {
      const { id, quantity, productId } = item;
      const cartItem = await Cart.findOne({
        where: { id, cashierId, transactionId: null },
        include: Product,
      });
      if (!cartItem) {
        return res.status(404).send({ error: "Cart item not found" });
      }
      if (quantity === 0) {
        // Delete cart item
        await cartItem.destroy();
      } else {
        // Update quantity, total price, and product ID
        cartItem.quantity = quantity;
        if (productId) {
          // Check if new product is active and has sufficient stock
          const newProduct = await Product.findByPk(productId);
          if (!newProduct || newProduct.statusId !== 1) {
            return res
              .status(404)
              .send({ error: "New product not found or not active" });
          }
          if (newProduct.item < quantity) {
            return res.status(400).send({ error: "Insufficient stock" });
          }
          cartItem.productId = productId;
          cartItem.totalPrice = newProduct.price * quantity;
        } else {
          // Check if current product has sufficient stock
          if (cartItem.Product.item < quantity) {
            return res.status(400).send({ error: "Insufficient stock" });
          }
          cartItem.totalPrice = cartItem.Product.price * quantity;
        }
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

exports.getCart = async (req, res) => {
  const cashierId = req.userId;
  try {
    const cartItems = await Cart.findAll({
      where: { cashierId, transactionId: null },
      include: Product,
    });
    res.send(cartItems);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while getting the cart" });
  }
};
