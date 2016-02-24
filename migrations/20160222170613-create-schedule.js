'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.TIME
      },
      location: {
        type: Sequelize.STRING
      },
      smallDogs: {
        type: Sequelize.INTEGER
      },
      mediumDogs: {
        type: Sequelize.INTEGER
      },
      largeDogs: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Schedules');
  }
};