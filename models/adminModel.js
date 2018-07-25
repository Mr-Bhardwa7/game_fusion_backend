const Sequelize = require('sequelize');
const db = require('./../config/connection');

const Admin = db.define('admins', {
  userName: {
    type: Sequelize.STRING(64)
  },
  userEmail: {
    type: Sequelize.STRING
  },
  userPassword: {
    type: Sequelize.STRING(64)
  },
  userToken: {
    type: Sequelize.TEXT
  }
});

module.exports = Admin;