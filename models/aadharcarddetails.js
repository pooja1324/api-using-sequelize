"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AadharCardDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users}) {
      // define association here
      this.hasOne(Users, { as: "aadhar" , foreignKey:'aadharId'});
    }

    toJSON(){
      return {...this.get(), id:undefined}
    }
  }
  AadharCardDetails.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      aadharNumber: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          notNull: { msg: "Aadhar number must not be null" },
          notEmpty: { msg: "Aadhar number must not be empty" },
          len:{
            args:[12,12],
            msg:'Aadhar Number Length must be 12'
          }
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Aadhar name must not be null" },
          notEmpty: { msg: "Aadhar name must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "aadhar_card_details",
      modelName: "AadharCardDetails",
    }
  );
  return AadharCardDetails;
};
