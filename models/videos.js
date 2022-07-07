"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
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
          commentableType: "video",
        },
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Videos.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Video url not provided" },
          notEmpty: { msg: "Video url must not be empty" },
          isUrl: { msg: "URL not valid" },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Video duraion not provided" },
        },
      },
    },
    {
      sequelize,
      modelName: "Videos",
    }
  );
  return Videos;
};
