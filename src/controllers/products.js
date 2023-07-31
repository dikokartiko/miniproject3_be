// controllers/products.js
const { Product, Category } = require("../models");
const { Op } = require("sequelize");

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

exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, category, name, sort } = req.query;
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (category) {
    whereClause.categoryId = category;
  }
  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }

  let orderClause = [];
  if (sort) {
    if (sort === "name_asc") {
      orderClause.push(["name", "ASC"]);
    } else if (sort === "name_desc") {
      orderClause.push(["name", "DESC"]);
    } else if (sort === "price_asc") {
      orderClause.push(["price", "ASC"]);
    } else if (sort === "price_desc") {
      orderClause.push(["price", "DESC"]);
    }
  }

  try {
    const products = await Product.findAndCountAll({
      where: whereClause,
      include: Category,
      limit,
      offset,
      order: orderClause,
    });

    res.send({
      data: products.rows,
      currentPage: page,
      totalPages: Math.ceil(products.count / limit),
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting the products" });
  }
};
