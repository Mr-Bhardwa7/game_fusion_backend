const Sequelize = require('sequelize');
const db = require('./../config/connection');
const User = require('./userModel');
const Game = require('./gameModel');
const GameOption = require('./gameOptionModel');

  const GameStat = db.define('gameStats', {
    id: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    player1_id: {
      type: Sequelize.INTEGER, underscored: true
    },
    player2_id: {
      type: Sequelize.INTEGER, underscored: true
    },
    gameStatus: {
      type: Sequelize.INTEGER
    },
    winStatus : {
      type: Sequelize.BOOLEAN
    }
  });

  GameStat.belongsTo(User, {foreignKey: 'player1_id'}); // Adds id to GameStats
  GameStat.belongsTo(User, {foreignKey: 'player2_id'}); // Adds id to GameStats
  GameStat.belongsTo(Game);
  GameStat.belongsTo(GameOption);

module.exports = GameStat;