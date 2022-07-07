"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ AadharCardDetails, Addresses,UserRoles, Roles, }) {
      // define association here
      this.belongsTo(AadharCardDetails, {
        as: "aadhar",
        foreignKey: "aadharId",
      });
      this.hasMany(Addresses, {
        as: "addresses",
        foreignKey: "userId",
      });
      this.belongsToMany(Roles, {
        through:UserRoles,
        as: "roles",
        foreignKey: "userId",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Users.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "User name must not be empty" },
        },
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a country code" },
        },
      },
      aadharId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
    }
  );
  return Users;
};
