const Sequelize = require('sequelize');
const db = require('./../../config/connection');
const Users = require('./userSchema');
const Games = require('./gameSchema');
const GameOptions = require('./gameOptionSchema');

const GameStats = db.define('gameStats', {
  id: {
    type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
  },
  player1_id: {
    type: Sequelize.INTEGER, underscored: true
  },
  player2_id: {
    type: Sequelize.INTEGER, underscored: true
  },
  game_id: {
    type: Sequelize.INTEGER, underscored: true
  },
  gameOption_id: {
    type: Sequelize.INTEGER, underscored:  true
  },
  gameStatus: {
    type: Sequelize.INTEGER
  }
});

  GameStats.belongsTo(Users, {foreignKey: 'player1_id'}); // Adds id to GameStats
  GameStats.belongsTo(Users, {foreignKey: 'player2_id'}); // Adds id to GameStats
  GameStats.belongsTo(Games);
  GameStats.belongsTo(GameOptions);

module.exports = GameStats;