"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users }) {
      // define association here
      this.belongsTo(Users, { as: "address", foreignKey: "userId" });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Addresses.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Address name must not be null" },
          notEmpty: { msg: "Address name must not be empty" },
        },
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Street must not be null" },
          notEmpty: { msg: "Street must not be empty" },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "City must not be null" },
          notEmpty: { msg: "City must not be empty" },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Country must not be null" },
          notEmpty: { msg: "Country must not be empty" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "addresses",
      modelName: "Addresses",
    }
  );
  return Addresses;
};
