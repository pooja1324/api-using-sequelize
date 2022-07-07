"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: DataTypes.INTEGER });
     */

    return queryInterface.addColumn("roles", "uuid", {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    });
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     return queryInterface.removeColumn(
      'roles',
      'uuid'
    );
  },
};
