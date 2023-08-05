// models/Category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "categoryId" });
  };

  return Category;
};
