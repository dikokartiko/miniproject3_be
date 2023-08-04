// models/index.js
const UserModel = require("./User");
const RoleModel = require("./Role");
const CategoryModel = require("./Category");
const ProductModel = require("./Product");
const StatusModel = require("./Status");
const TransactionModel = require("./transaction");
const CartModel = require("./cart");
const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Status = StatusModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
const Cart = CartModel(sequelize, Sequelize);

User.associate({ Role, Status });
Role.associate({ User });
Product.associate({ Category, Status });
Category.associate({ Product, Status }); // Update this line
Status.associate({ Product, User, Category }); // Update this line
Transaction.associate({ User, Cart }); // Add this line
Cart.associate({ Product, Transaction }); // Add this line

module.exports = {
  sequelize,
  User,
  Role,
  Category,
  Product,
  Status,
  Transaction, // Add this line
  Cart, // Add this line
};
