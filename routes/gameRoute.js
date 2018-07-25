const apiController = require('./../controllers/gameController');
const app = require('./../app').app;

app.get('/',apiController.games);

app.get('/game-option/:id',apiController.selectedGame);

app.post('/api/chainreaction',apiController.chainreaction);

app.post('/api/tictactoe',apiController.tictactoe);

app.post('/api/game-result',apiController.gameResult);