const apiController = require('./../controllers/installController');
const app = require('./../app').app;

app.get('/api/install',apiController.installSetup);