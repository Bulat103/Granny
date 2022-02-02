module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{

      name: 'John Doe',
      email: 'dsasd@mail.ru',
      password: 'qwerty',
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
