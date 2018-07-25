const Sequelize = require('sequelize');
const db = require('./../config/connection');

const GameOption = db.define('gameOptions', {

  gameOption: {
    type: Sequelize.INTEGER
  }
});

module.exports = GameOption;