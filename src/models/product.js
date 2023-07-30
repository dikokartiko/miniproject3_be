// models/Product.js
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    };
  
    return Product;
  };
  