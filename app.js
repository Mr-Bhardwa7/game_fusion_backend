const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.set('origins', '*:*');
const bodyParser    = require('body-parser');
const cors = require('cors');
const helper = require('./helpers/helper')
const socketHelper = require('./helpers/envHelper')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors())

//my midlewware
app.use(helper.middleware);
app.use('/assets', express.static(__dirname + '/public/files'));

server.listen(5000,() => {
	console.log("server connected!")
});


	io.on('connection', function (socket) { console.log("in heres");
	socket.emit('connected', {users : socketHelper.users});

	socket.on('userdisconnect', function (data) {
     		socketHelper.users.splice(socketHelper.users.indexOf(data),1);
     		io.sockets.emit('connected', {users : socketHelper.users});
     		console.log("data",data)
     		console.log("data",socketHelper.users)
  		});

	socket.on('userConnected', function (data) {
     		io.sockets.emit('connected', {users : socketHelper.users});
     		console.log("data",data)
  		});


	socket.on('challenge request', function (challengeReq) {
		io.sockets.emit('challenge-notify', { 
			player1_Name : challengeReq.player1_Name,
			player1: challengeReq.player1,
			player2 : challengeReq.player2,
			game : challengeReq.game,
			gameOption : challengeReq.gameOption,
			challengeStatus : challengeReq.challengeStatus

		});
	});

	socket.on('challenge reject', function (data) {
     		io.sockets.emit('challenge reject message', {
     			msg : data.msg,
     			player : data.player1
     		});
  		});

	socket.on('challenge accept', function (data) {
     		io.sockets.emit('challenge accept message', {
     			msg : data.msg,
     			player1 : data.player1,
     			player2 : data.player2,
     			game : data.game,
     			gameOption : data.gameOption
     		});
  		});

	socket.on('preparing game board', function (data) {
     		io.sockets.emit('start game', {
     			player1 : data.player1,
				player2 : data.player2,
				game : data.game,
				gameOption : data.gameOption,
				gameStatus : data.gameStatus
     		});
  		});

    socket.on('rematch', function (data) {
            io.sockets.emit('rematch notification', {
                msg : `${data.player1Name} want a rematch, Play Now`, 
                player1 : data.player1,
                player1Name : data.player1Name,
                player2 : data.player2,
                player2Name : data.player2Name,
                game : data.game,
                gameOption : data.gameOption,
                gameStatus : 1,
            });
        });

    socket.on('rematch rejected', function (data) {
            io.sockets.emit('rematch rejected message', {
                msg : data.msg,
                player : data.player
            });
        });

    socket.on('tictactoe state', function (data) {
            io.sockets.emit('tictactoe state update', {
                challengePlayer1 : data.challengePlayer1,
                challengePlayer2 : data.challengePlayer2,
                cellTarget : data.cellTarget,
                lastPlayerMove : data.lastPlayerMove
            });
        });

    socket.on('chainreaction state', function (data) {
            io.sockets.emit('chainreaction state update', {
                challengePlayer1 : data.challengePlayer1,
                challengePlayer2 : data.challengePlayer2,
                cellTarget : data.cellTarget,
                lastPlayerMove : data.lastPlayerMove
            });
        });

    socket.on('tictactoe game leave', function (data) {
            io.sockets.emit('tictactoe game leave update', {
                winStatus : data.winStatus
            });
        });

    socket.on('chainreaction game leave', function (data) {
            io.sockets.emit('chainreaction game leave update', {
                winStatus : data.winStatus
            });
        });

    socket.on('chat-invoked', function (data) {
            io.sockets.emit('chat-reply',{
                msg        : data.msg,
                sender     : data.sender,
                game       : data.game,
                gameOption : data.gameOption
            });
        });



});

module.exports = {app, io}; 
const routes = require('./routes')
