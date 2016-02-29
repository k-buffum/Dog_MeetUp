'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
     'Users',
     'time',
     Sequelize.TIME
    ),
    queryInterface.addColumn(
     'Users',
     'placeId',
     Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
     'Users',
     'time');
    queryInterface.removeColumn(
     'Users',
     'placeId');
  }
};
