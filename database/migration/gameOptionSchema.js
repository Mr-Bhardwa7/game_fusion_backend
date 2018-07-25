const Sequelize = require('sequelize');
const db = require('./../../config/connection');

const GameOptions = db.define('gameOptions', {

  gameOption: {
    type: Sequelize.INTEGER
  }
});

module.exports = GameOptions;