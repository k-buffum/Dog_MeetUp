'use strict';
module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define('Schedule', {
    userId: DataTypes.INTEGER,
    time: DataTypes.TIME,
    location: DataTypes.STRING,
    smallDogs: DataTypes.INTEGER,
    mediumDogs: DataTypes.INTEGER,
    largeDogs: DataTypes.INTEGER,
    placeId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Schedule;
};