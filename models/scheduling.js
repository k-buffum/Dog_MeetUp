'use strict';
module.exports = function(sequelize, DataTypes) {
  var Scheduling = sequelize.define('Scheduling', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    time: DataTypes.TIME,
    smallDogs: DataTypes.INTEGER,
    mediumDogs: DataTypes.INTEGER,
    largeDogs: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Scheduling;
};