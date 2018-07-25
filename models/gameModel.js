const Sequelize = require('sequelize');
const db = require('./../config/connection');

const Game = db.define('games', {
  
  gameName: {
    type: Sequelize.STRING
  }
});

module.exports = Game;