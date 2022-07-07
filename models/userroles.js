"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Roles }) {
      // define association here
      this.belongsTo(Users, { as: "users", foreignKey: "userId" });
      this.belongsTo(Roles, { as: "roles", foreignKey: "roleId" });
    }
  }
  UserRoles.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a role" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId must not be null" },
        },
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    },
    {
      sequelize,
      tableName: "user_roles",
      modelName: "UserRoles",
    }
  );
  return UserRoles;
};
