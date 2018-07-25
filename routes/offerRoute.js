const apiController = require('./../controllers/offersController');
const app = require('./../app').app;

app.post('/api/offer',apiController.createOffer);

app.post('/api/coin-offers',apiController.coinsOffer);

app.post('/api/offer-details',apiController.offerDetails);

app.post('/api/offer-delete',apiController.offerDelete);


