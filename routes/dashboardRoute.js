const apiController = require('./../controllers/dashboardController');
const app = require('./../app').app;

app.post('/api/dashboard',apiController.dashboard);