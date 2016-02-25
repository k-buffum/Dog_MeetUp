'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    locationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reviews: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    placeId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Reviews;
};