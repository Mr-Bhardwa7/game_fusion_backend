const Coin = require('./../../models/coinModel');

// force: true will drop the table if it already exists
Coin.sync({force:true}).then(() => {
  console.log("Coins Table Created")
  return true;
});

module.exports = Coin;