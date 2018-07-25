const Admin = require('./../../models/adminModel');
const bcrypt = require("bcrypt");

// force: true will drop the table if it already exists
Admin.sync({force:true}).then(() => {
  console.log("Admins Table Created")
  
	  return Admin.bulkCreate([
	  { userName: 'Animesh', userEmail: 'animesh@admin.in', userPassword : bcrypt.hashSync('qwerty', 10), userToken: bcrypt.hashSync('animesh@admin.in', 10)}
	]).then(() => { 
	// Notice: There are no arguments here, as of right now you'll have to...
	  console.log("Data inserted")
	})
});

module.exports = Admin;