const Sequelize = require('sequelize');
const db = require('./../config/connection');
const User = require('./userModel');

const Rating = db.define('ratings', {
  
  ratingLevel: {
    type: Sequelize.INTEGER
  },
  targetXP: {
    type: Sequelize.INTEGER
  },
  achivedXP: {
    type: Sequelize.INTEGER
  }
});

User.hasOne(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User);

module.exports = Rating;