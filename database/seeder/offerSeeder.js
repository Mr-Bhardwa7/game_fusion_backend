const Offer = require('./../../models/offerModel');

// force: true will drop the table if it already exists
Offer.sync({force:true}).then(() => {
  console.log("Offers Table Created")
  return true;
});

module.exports = Offer;