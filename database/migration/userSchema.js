const Sequelize = require('sequelize');
const db = require('./../../config/connection');

const Users = db.define('users', {
  
  userName: {
    type: Sequelize.STRING(64)
  },
  userEmail: {
    type: Sequelize.STRING
  },
  userPassword: {
    type: Sequelize.STRING(64)
  },
  userUniqueID: {
    type: Sequelize.STRING(64)
  },
  userProfilePic: {
    type: Sequelize.STRING
  },
  userProfilePath:{
    type: Sequelize.TEXT
  }
});

module.exports = Users;