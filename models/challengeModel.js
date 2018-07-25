const Sequelize = require('sequelize');
const db = require('./../config/connection');
const User = require('./userModel');
const Game = require('./gameModel');
const GameOption = require('./gameOptionModel');

  const Challenge = db.define('challenges', {
    player1_id: {
      type: Sequelize.INTEGER, underscored: true
    },
    player2_id: {
      type: Sequelize.INTEGER, underscored: true
    },
    challengeStatus: {
      type: Sequelize.BOOLEAN
    }
  });

 Challenge.belongsTo(User, {foreignKey: 'player1_id'});
 Challenge.belongsTo(User, {foreignKey: 'player2_id'}); 
 Challenge.belongsTo(Game);
 Challenge.belongsTo(GameOption);

module.exports = Challenge;