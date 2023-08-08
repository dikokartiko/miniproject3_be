// controllers/categories.js
const { Category, Product } = require("../models");

exports.createCategory = async (req, res) => {
  const { name, status } = req.body;
  try {
    const category = await Category.create({ name, status });
    res.status(201).send(category);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the category" });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }
    if (name) category.name = name;
    if (status !== undefined) category.status = status;
    await category.save();
    res.send(category);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating the category" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }
    await Product.destroy({ where: { categoryId: id } });
    await category.destroy();
    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the category" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting all categories" });
  }
};

//refactor
const getWhereClause = (status) => {
  let whereClause = {};
  if (status !== undefined) {
    whereClause.status = status === "true";
  }
  return whereClause;
};

const getOrderClause = (sort) => {
  let orderClause = [];
  if (sort) {
    if (sort === "created_asc") {
      orderClause.push(["createdAt", "ASC"]);
    } else if (sort === "created_desc") {
      orderClause.push(["createdAt", "DESC"]);
    }
  }
  return orderClause;
};

exports.getCategoriesByStatus = async (req, res) => {
  const { status, sort } = req.query;
  try {
    const whereClause = getWhereClause(status);
    const orderClause = getOrderClause(sort);
    const categories = await Category.findAll({
      where: whereClause,
      include: Product,
      order: orderClause,
    });
    res.send(categories);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting categories by status" });
  }
};
