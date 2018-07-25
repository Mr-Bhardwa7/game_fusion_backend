const Sequelize = require('sequelize');
const db = require('./../../config/connection');

const Admins = db.define('admins', {
  id: {
    type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
  },
  adminName: {
    type: Sequelize.STRING(64)
  },
  adminEmail: {
    type: Sequelize.STRING
  },
  adminPassword: {
    type: Sequelize.STRING(64)
  }
});

module.exports = Admins;