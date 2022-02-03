module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [{
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk55azndemckbtQnAFEr_PBFrmxeU4dwwCfg&usqp=CAU',
      body: 'cute cat',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      url: 'https://aif-s3.aif.ru/images/007/575/3d7f83312ccb479821add4b81966a86e.jpg',
      body: 'How make salad',
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  },
};
