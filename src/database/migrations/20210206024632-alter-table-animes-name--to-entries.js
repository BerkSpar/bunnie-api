'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('animes', 'entries');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('entries', 'animes');
  },
};
