const Challenge = require('./../../models/challengeModel');

// force: true will drop the table if it already exists
Challenge.sync({force:true}).then(() => {
  console.log("Challenges Table Created")
  return true;
});

module.exports = Challenge;