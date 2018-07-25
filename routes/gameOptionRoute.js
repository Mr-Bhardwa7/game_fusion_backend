const apiController = require('./../controllers/gameOptionController');
const app = require('./../app').app;

app.get('/api/game-option',apiController.gameOptions);