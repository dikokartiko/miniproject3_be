// models/index.js
const UserModel = require("./User");
const RoleModel = require("./Role");
const CategoryModel = require("./Category");
const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);

User.associate({ Role });
Role.associate({ User });

module.exports = {
  sequelize,
  User,
  Role,
  Category,
};
