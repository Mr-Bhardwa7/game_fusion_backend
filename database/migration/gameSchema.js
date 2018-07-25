const Sequelize = require('sequelize');
const db = require('./../../config/connection');

const Games = db.define('games', {
  
  gameName: {
    type: Sequelize.STRING
  }
});

module.exports = Games;