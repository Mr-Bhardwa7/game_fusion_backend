const apiController = require('./../controllers/paymentController');
const app = require('./../app').app;

app.post('/api/paypal-details',apiController.offerPurchase);

app.post('/api/payment-details',apiController.paymentDetails);