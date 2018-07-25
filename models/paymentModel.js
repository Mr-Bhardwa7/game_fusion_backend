const Sequelize = require('sequelize');
const db = require('./../config/connection');
const Offer = require('./offerModel');
const User = require('./userModel');

const Payment = db.define('payments', {
  
  paymentId : {
  	type: Sequelize.STRING
  },
  status : {
  	type: Sequelize.BOOLEAN
  }

});

  Payment.belongsTo(User);
  Payment.belongsTo(Offer); 

module.exports = Payment;