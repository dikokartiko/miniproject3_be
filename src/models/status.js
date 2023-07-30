// models/Status.js
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define("Status", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Status.associate = (models) => {
    Status.hasMany(models.Product, { foreignKey: "statusId" });
  };

  return Status;
};
