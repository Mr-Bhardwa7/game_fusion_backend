const Sequelize = require('sequelize');
const db = require('./../../config/connection');
const Offers = require('./offerSchema');
const Users = require('./userSchema');

const Payments = db.define('payments', {
  
});

  Payments.belongsTo(Users);
  Payments.belongsTo(Offers); 

module.exports = Payments;