"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Images, Videos }) {
      // define association here
      this.belongsTo(Images, {
        foreignKey: "commentableId",
        as: "image",
        constraints: false,
        
      });
      this.belongsTo(Videos, {
        foreignKey: "commentableId",
        as: "video",
        constraints: false,
        
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Comments.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Comment must not be null" },
          notEmpty: { msg: "Comment must not be empty" },
        },
      },
      commentableType: DataTypes.STRING,
      commentableId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
