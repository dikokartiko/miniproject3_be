// models/index.js
const UserModel = require("./User");
const CashierModel = require("./Cashier");
const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const User = UserModel(sequelize, Sequelize);
const Cashier = CashierModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
  Cashier,
};
