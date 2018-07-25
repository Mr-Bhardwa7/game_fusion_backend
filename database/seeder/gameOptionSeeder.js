const GameOption = require('./../../models/gameOptionModel');

// force: true will drop the table if it already exists
GameOption.sync({force:true}).then(() => {
  console.log("GameOptions Table Created")
  
  return GameOption.bulkCreate([
  { gameOption: 10},
  { gameOption: 50},
  { gameOption: 100}
]).then(() => {
// Notice: There are no arguments here, as of right now you'll have to...
  console.log("Data inserted")
})

});

module.exports = GameOption;