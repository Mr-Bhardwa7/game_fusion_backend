const apiController = require('./../controllers/challengeController');
const app = require('./../app').app;

app.post('/api/challenge',apiController.onlineUser);

app.post('/api/user-challenge',apiController.challenge);

app.post('/api/player-status',apiController.checkPlayerStatus);

app.post('/api/challenge-reject',apiController.challengeReject);

app.post('/api/challenge-accept',apiController.challengeAccept);

app.post('/api/rematch-accept',apiController.rematchAccept);