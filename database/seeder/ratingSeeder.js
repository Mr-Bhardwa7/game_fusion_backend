const Rating = require('./../../models/ratingModel');

// force: true will drop the table if it already exists
Rating.sync({force:true}).then(() => {
  console.log("Ratings Table Created")
  return true;
});

module.exports = Rating;