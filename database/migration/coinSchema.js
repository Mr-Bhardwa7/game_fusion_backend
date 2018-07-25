const Sequelize = require('sequelize');
const db = require('./../../config/connection');
const Users = require('./userSchema');

const Coins = db.define('coins', {
  
  totalWinningCoins: {
    type: Sequelize.INTEGER
  },
  currentCoins: {
    type: Sequelize.INTEGER
  }
});

Coins.belongsTo(Users);

module.exports = Coins;