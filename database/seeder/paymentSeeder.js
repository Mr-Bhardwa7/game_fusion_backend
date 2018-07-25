const Payment = require('./../../models/paymentModel');

// force: true will drop the table if it already exists
Payment.sync({force:true}).then(() => {
  console.log("Payments Table Created")
  return true;
});

module.exports = Payment;