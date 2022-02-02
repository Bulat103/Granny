module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [{

      name: 'Lena',
      email: 'aaaa@mail.ru',
      password: 'qwerty',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
