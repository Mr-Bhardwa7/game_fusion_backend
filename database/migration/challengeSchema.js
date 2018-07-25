const Sequelize = require('sequelize');
const db = require('./../../config/connection');
const Users = require('./userSchema');
const Games = require('./gameSchema');
const GameOptions = require('./gameOptionSchema');

const Chllenges = db.define('challenges', {
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
  challengeAt: {
    type: Sequelize.DATE
  },
  challengeStatus: {
    type: Sequelize.INTEGER
  }
});

 Chllenges.belongsTo(Users, {foreignKey: 'player1_id'});
 Chllenges.belongsTo(Users, {foreignKey: 'player2_id'}); 
 Chllenges.belongsTo(Games);
 Chllenges.belongsTo(GameOptions);

module.exports = Chllenges;