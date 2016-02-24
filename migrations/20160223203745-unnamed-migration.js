'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
     'Users',
     'smallDogs',
     Sequelize.INTEGER
    ),
    queryInterface.addColumn(
     'Users',
     'mediumDogs',
     Sequelize.INTEGER
    ),
    queryInterface.addColumn(
     'Users',
     'largeDogs',
     Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
