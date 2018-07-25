const User = require('./../../models/userModel');

// force: true will drop the table if it already exists
User.sync({force:true}).then(() => {
  console.log("Users Table Created")
  return true;
});

module.exports = User;