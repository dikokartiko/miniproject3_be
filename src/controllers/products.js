// controllers/products.js
const { Product, Category } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

exports.createProduct = async (req, res) => {
  const { name, price, categoryId, description, status, stock } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const product = await Product.create({
      name,
      image,
      price,
      categoryId,
      description,
      status,
      stock,
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
  const { name, price, categoryId, description, status, stock } = req.body;
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
    if (status) product.status = status;
    if (stock) product.stock = stock;
    await product.save();
    res.send(product);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating the product" });
  }
};

const getWhereClause = (category, name, status) => {
  let whereClause = {};
  if (category) {
    whereClause.categoryId = category;
  }
  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }
  if (status) {
    whereClause.status = status;
  }
  return whereClause;
};

const getOrderClause = (sort) => {
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
    } else if (sort === "created_asc") {
      orderClause.push(["createdAt", "ASC"]);
    } else if (sort === "created_desc") {
      orderClause.push(["createdAt", "DESC"]);
    }
  }
  return orderClause;
};

exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, category, name, sort, status } = req.query;
  const offset = (page - 1) * limit;
  const whereClause = getWhereClause(category, name, status);
  const orderClause = getOrderClause(sort);
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

exports.getProductImage = async (req, res) => {
  const id = req.params.productId;
  try {
    const product = await Product.findByPk(id);
    const filePath = path.resolve(product.image);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    if (!product.image) {
      return res.status(404).send({ error: "Product image not found" });
    }
    fs.existsSync(path.resolve(product.image));
    res.sendFile(path.resolve(product.image));
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting the product image" });
  }
};
