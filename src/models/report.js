const { Transaction } = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
    cashierId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerProduct: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: "cashierId" });
    Report.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return Report;
};
