// models/index.js
const UserModel = require("./User");
const RoleModel = require("./Role");
const CategoryModel = require("./Category");
const ProductModel = require("./Product");
const StatusModel = require("./Status");
const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Status = StatusModel(sequelize, Sequelize);

User.associate({ Role });
Role.associate({ User });
Product.associate({ Category, Status });
Category.associate({ Product });
Status.associate({ Product });

module.exports = {
  sequelize,
  User,
  Role,
  Category,
  Product,
  Status,
};
