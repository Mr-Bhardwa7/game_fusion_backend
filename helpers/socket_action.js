const socketHelper = require('./envHelper')

module.exports.connection = () => {
	// const io = require('socket.io')(server);
	// io.set('origins', '*:*');
	const io = require('./../app').io;
	io.on('connection', function (socket) { console.log("in heres");
	  socket.emit('connected', {users : socketHelper.users});
	});	

}
