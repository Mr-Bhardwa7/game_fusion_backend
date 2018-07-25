const GameStats = require('./../../models/gameStatsModel');

// force: true will drop the table if it already exists
GameStats.sync({force:true}).then(() => {
  console.log("GameStsts Table Created")
  return true;
});

module.exports = GameStats;