// controllers/carts.js
const { Cart, Product } = require("../models");

async function updateCartItem(cartItem, quantity, totalPrice) {
  cartItem.quantity += quantity;
  cartItem.totalPrice += totalPrice;
  await cartItem.save();
}

async function createCartItem(
  productId,
  quantity,
  price,
  totalPrice,
  cashierId
) {
  await Cart.create({
    productId,
    quantity,
    price,
    totalPrice,
    cashierId,
  });
}

async function processItem(item, cashierId) {
  const { productId, quantity } = item;
  const product = await Product.findByPk(productId);
  if (!product || !product.status)
    return { error: "Product not found or not active" };
  if (product.stock < quantity) return { error: "Insufficient stock" };
  const totalPrice = product.price * quantity;
  let cartItem = await Cart.findOne({
    where: { productId, cashierId },
  });
  if (cartItem) {
    updateCartItem(cartItem, quantity, totalPrice);
  } else {
    createCartItem(productId, quantity, product.price, totalPrice, cashierId);
  }
}

exports.addToCart = async (req, res) => {
  const { items } = req.body;
  const cashierId = req.userId;
  try {
    for (const item of items) {
      const result = await processItem(item, cashierId);
      if (result && result.error) return res.status(400).send(result);
    }
    res.status(201).send({ message: "Items added to cart successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while adding to the cart" });
  }
};

const updateCartItems = async (item, cashierId) => {
  const { id, quantity } = item;
  const cartItem = await Cart.findOne({
    where: { id, cashierId },
    include: Product,
  });
  if (!cartItem) return false;
  if (quantity === 0) {
    await cartItem.destroy();
  } else {
    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.price * quantity;
    await cartItem.save();
  }
  return true;
};

exports.updateCart = async (req, res) => {
  const { items } = req.body;
  const cashierId = req.userId;
  try {
    for (const item of items) {
      const updated = await updateCartItems(item, cashierId);
      if (!updated)
        return res.status(404).send({ error: "Cart item not found" });
    }
    res.send({ message: "Cart items updated successfully" });
  } catch (error) {
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
  try {
    const cartItems = await Cart.findAll({
      where: { cashierId },
      include: Product,
    });
    res.send(cartItems);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while getting the cart" });
  }
};
