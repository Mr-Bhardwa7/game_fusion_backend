const Game = require('./../../models/gameModel');

// force: true will drop the table if it already exists
Game.sync({force:true}).then(() => {
  console.log("Games Table Created")
  
  return Game.bulkCreate([
  { gameName: 'Tic Tac Toe'},
  { gameName: 'Chain Reaction'}
]).then(() => { 
// Notice: There are no arguments here, as of right now you'll have to...
  console.log("Data inserted")
})

});

module.exports = Game;