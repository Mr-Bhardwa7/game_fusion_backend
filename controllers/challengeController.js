const User = require('./../models/userModel');
const Challenge = require('./../models/challengeModel');
const GameStats = require('./../models/gameStatsModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

	

/**
 * this function will fetch all online user
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.onlineUser = (req,res) => {
	try{

		console.log("req arr",req.body.data)

		User.findAll({
			where : {
				userUniqueID : {
					[Op.in]: req.body.data
				}
			},
			raw : true
		}).then((success) => {
			var data = {
					status : 200,
					error : false,
					message : "online users",
					data : success
				}

				res.status(200).send(data);
		}).catch(()=> {
			var data = {
					status : 200,
					error : true,
					message : "no user online",
					data : []
				}

				res.status(200).send(data);
		})

	} catch(err){
		throw err;
	}
}



/**
 * this function will insert new challenge request
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.challenge = (req,res) => {
	try{
			// console.log("req log", req)
		Challenge.create({
			player1_id: req.body.player1,
			player2_id: req.body.player2,
			challengeStatus: 0,
			gameId: req.body.game,
			gameOptionId:req.body.gameOption
		}).then((success) => {
			// console.log(success)
			var data = {
					status : 200,
					error : false,
					message : "Challenge on waiting",
					data : success
				}

				res.status(200).send(data);
		}).catch(()=> {
			var data = {
					status : 200,
					error : true,
					message : "",
					data : []
				}

				res.status(200).send(data);
		})


	} catch(err){
		throw err;
	}
}



/**
 * this function will check the player is playing any game or not
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.checkPlayerStatus = (req,res) => {
	try{
		
		GameStats.findAll({
			where : {
				gameStatus : 0,
				[Op.or] : {
					player1_id : {
						[Op.eq] : req.body.player
					},
					player2_id : {
						[Op.eq] : req.body.player
					}
				}
			}
		}).then((status) => {
			if(status == '')
			{
				var data = {
					status : 200,
					error : true,
					message : "",
					data : []
				}

				res.status(200).send(data);

			} else {

				User.findAll({
					id : req.body.player
				}).then((user) => {
					console.log("user",user[0].userName);

					var data = {
						status : 200,
						error : false,
						message : `${user[0].userName} is playing game, challenge him/her later!`,
						data : status
					}

					res.status(200).send(data);

				});
			}
		})

	} catch(err){
		throw err;
	}
}


exports.challengeReject = (req,res) => {
	try{
		Challenge.update({
			challengeStatus : true
		},
		{
			where : {
				player1_id : req.body.player1,
				player2_id : req.body.player2,
				gameId : req.body.game,
				gameOptionId : req.body.gameOption,
				challengeStatus : false
			},
			raw :  true
		}).then(()=> {
			console.log("Challenge updated successfull");
			User.findAll({
				id : req.body.player2
			}).then((user) => {
				console.log("user",user[0].userName)
				var data = {
					status : 200,
					error : false,
					message : `${user[0].userName} is busy, challenge him/her later!`,
					data : []
				}

				res.status(200).send(data);
			});
		}).catch(()=> {
			console.log("Trouble is updating challenge")
		})

	} catch(err){
		throw err;
	}
}

/**
 * this function will create new gamestats data when user accept the challenge
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.challengeAccept = (req, res) => {
	try{
		Challenge.update({
			challengeStatus : true
		},
		{
			where : {
				player1_id : req.body.player1,
				player2_id : req.body.player2,
				gameId : req.body.game,
				gameOptionId : req.body.gameOption,
				challengeStatus : false
			},
			raw :  true
		}).then(() => {

			GameStats.create({
				player1_id: req.body.player1,
				player2_id: req.body.player2,
				gameStatus: 0,
				winStatus: null,
				gameId : req.body.game,
				gameOptionId: req.body.gameOption
			}).then((stats) => {

				var data = {
					status : 200,
					error : false,
					message : '',
					data : stats
				}

				res.status(200).send(data);
				
			}).catch(()=> {
				var data = {
					status : 200,
					error : true,
					message : 'Something went wrong!',
					data : []
				}

				res.status(200).send(data);
			})
		})

	} catch(err){
		throw err;
	}
}

exports.rematchAccept = (req,res) => {
	try{

		GameStats.create({
				player1_id: req.body.player1,
				player2_id: req.body.player2,
				gameStatus: 0,
				winStatus: null,
				gameId : req.body.game,
				gameOptionId: req.body.gameOption
			}).then((stats) => {

				var data = {
					status : 200,
					error : false,
					message : '',
					data : stats
				}

				res.status(200).send(data);
				
			}).catch(()=> {
				var data = {
					status : 200,
					error : true,
					message : 'Something went wrong!',
					data : []
				}

				res.status(200).send(data);
			})


	}catch(err){
		throw err;
	}
}