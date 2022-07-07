"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comments }) {
      
      // define association here
      this.hasMany(Comments, {
        foreignKey: "commentableId",
        as: "comments",
        constraints: false,
        scope: {
          commentableType: "image",
        },
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Images.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Image url not provided" },
          notEmpty: { msg: "Image url must not be empty" },
          isUrl: { msg: "URL not valid" },
        },
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Image height not provided" },
          notEmpty: { msg: "Image height must not be empty" },
        },
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Image width not provided" },
          notEmpty: { msg: "Image width must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "images",
      modelName: "Images",
    }
  );
  return Images;
};
