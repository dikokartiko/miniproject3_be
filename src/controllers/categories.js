// controllers/categories.js
const { Category, Product } = require("../models");

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).send(category);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the category" });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    if (name) category.name = name;

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

    await category.destroy();
    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the category" });
  }
};

exports.getCategories = async (req, res) => {
  const { statusId } = req.query;

  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        where: statusId ? { statusId } : {},
      },
    });

    res.send(categories);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while getting the categories" });
  }
};
