"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_code: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      aadharId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'aadhar_card_details',
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  },
};
