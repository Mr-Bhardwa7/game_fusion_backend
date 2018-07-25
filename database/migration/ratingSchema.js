const Sequelize = require('sequelize');
const db = require('./../../config/connection');
const Users = require('./userSchema');

const Ratings = db.define('ratings', {
  
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

Ratings.belongsTo(Users);

module.exports = Ratings;