// models/Cashier.js
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Cashier = sequelize.define("Cashier", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "disabled"),
      defaultValue: "active",
    },
  });

  Cashier.beforeCreate(async (cashier) => {
    const salt = await bcrypt.genSalt(10);
    cashier.password = await bcrypt.hash(cashier.password, salt);
  });

  Cashier.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return Cashier;
};
