"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, UserRoles}) {
      // define association here
      this.belongsToMany(Users, {
        through:UserRoles,
        as: "roles",
        foreignKey: "roleId",
      });
    }
  }
  Roles.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Role name must not be null" },
          notEmpty: { msg: "Role name must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName:"roles",
      modelName: "Roles",
    }
  );
  return Roles;
};
