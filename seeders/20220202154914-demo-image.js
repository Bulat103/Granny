module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [{

      url: 'aaa',
      body: 'aaxxx',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  },
};
