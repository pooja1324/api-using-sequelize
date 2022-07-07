'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      text: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      commentableType: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      commentableId: {
        allowNull:false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Comments');
  }
};