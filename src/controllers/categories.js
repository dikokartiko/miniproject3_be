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

    // Delete products with the same category
    await Product.destroy({ where: { categoryId: id } });

    // Delete category
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

exports.getCategoriesByStatus = async (req, res) => {
  const { status } = req.query;
  try {
    let whereClause = {};
    if (status !== undefined) {
      whereClause.status = status === "true";
    }
    const categories = await Category.findAll({
      where: whereClause,
      include: Product,
    });
    res.send(categories);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting categories by status" });
  }
};
