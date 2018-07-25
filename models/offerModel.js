const Sequelize = require('sequelize');
const db = require('./../config/connection');

const Offer = db.define('offers', {
  
  offerCoin: {
    type: Sequelize.INTEGER
  },
  offerValue: {
    type: Sequelize.FLOAT
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  }
});

module.exports = Offer;