"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "roles",
      [
        {
          uuid: "128746ab-5a80-46a1-a320-951974b23e5a",
          name: "user",
          createdAt: "2022-07-06T07:28:10.700Z",
          updatedAt: "2022-07-06T07:28:10.700Z",
        },
        {
          uuid: "5725abce-5a80-46a1-a320-951974b23e5a",
          name: "admin",
          createdAt: "2022-07-06T07:28:10.700Z",
          updatedAt: "2022-07-06T07:28:10.700Z",
        },
        {
          uuid: "abcf79f6-5a80-46a1-a320-951974b23e5a",
          name: "superadmin",
          createdAt: "2022-07-06T07:28:10.700Z",
          updatedAt: "2022-07-06T07:28:10.700Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
