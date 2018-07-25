const Sequelize = require('sequelize');
const db = require('./../config/connection');
const User = require('./userModel');

const Coin = db.define('coins', {
  
  totalWinningCoins: {
    type: Sequelize.INTEGER
  },
  currentCoins: {
    type: Sequelize.INTEGER
  }
});

User.hasOne(Coin, { foreignKey: 'userId' });
Coin.belongsTo(User);

module.exports = Coin;