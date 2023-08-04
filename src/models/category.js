// models/Category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Statuses",
        key: "id",
      },
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "categoryId" });
    Category.belongsTo(models.Status, { foreignKey: "statusId" });
  };

  return Category;
};
