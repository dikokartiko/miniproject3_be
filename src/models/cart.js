module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      // Change this line
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cashierId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    transactionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Transactions",
        key: "id",
      },
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Product, { foreignKey: "productId" });
    Cart.belongsTo(models.Transaction, { foreignKey: "transactionId" });
  };

  return Cart;
};
