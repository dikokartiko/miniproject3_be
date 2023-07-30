// controllers/products.js
const { Product } = require("../models");

exports.createProduct = async (req, res) => {
  const { name, price, categoryId, description, statusId } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const product = await Product.create({
      name,
      image,
      price,
      categoryId,
      description,
      statusId,
    });
    res.status(201).send(product);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the product" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, categoryId, description, statusId } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    if (name) product.name = name;
    if (image) product.image = image;
    if (price) product.price = price;
    if (categoryId) product.categoryId = categoryId;
    if (description) product.description = description;
    if (statusId) product.statusId = statusId;

    await product.save();
    res.send(product);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating the product" });
  }
};
