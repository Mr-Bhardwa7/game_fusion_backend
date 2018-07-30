const Game = require('./../models/gameModel');
const User = require('./../models/userModel');
const GameStats = require('./../models/gameStatsModel');
const Rating = require('./../models/ratingModel');
const Coin = require('./../models/coinModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * this function will fetch all game record
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.games = (req,res) => {
 	try{
 		Game.findAll().then((game)=> {
 			var data = {
				status: 200, 
				error: false,
				message: "", 
				data: game 
			};

			res.status(200).send(data);
 		})

 	} catch(err){
 		throw err;
 	}
 }

/**
 * this function will fetch selected game based on param
 * @id  {[Integer]} req [It will be game id]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.selectedGame = (req,res) => {
 	try{
 		Game.findAll({
 			where : {
 				id: req.params.id
 			}
 		}).then((selectedResult) => {
 			var data = {
				status: 200, 
				error: false,
				message: "", 
				data: selectedResult 
			};

			res.status(200).send(data);
 		})

 	} catch(err) {
 		throw err;
 	}
 }


/**
 * this function will fetch all user of chainreacton game
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.chainreaction = (req,res) => {
 	try{
 			players = [req.body.player1,req.body.player2];
 		User.findAll({
 			where : {
 				id : {
 					[Op.in]: players
 				}
 			},
 			raw : true
 		}).then((user) => {
 			
 			var data = {
				status: 200, 
				error: false,
				message: "", 
				data: user 
			};

			res.status(200).send(data);
 		})

 	}catch(err){
 		throw err;
 	}
 }

 /**
 * this function will fetch all user of tictactoe game
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.tictactoe = (req,res) => {
 	try{
 			players = [req.body.player1,req.body.player2];
 		User.findAll({
 			where : {
 				id : {
 					[Op.in]: players
 				}
 			},
 			raw : true
 		}).then((user) => {
 			
 			var data = {
				status: 200, 
				error: false,
				message: "", 
				data: user 
			};

			res.status(200).send(data);
 		})

 	}catch(err){
 		throw err;
 	}
 }


 exports.gameResult = (req,res) => {
 	try{
 		var amount,user;

 		if(req.body.gameOption === '1')
 			amount = 10;

 		if(req.body.gameOption === '2')
 			amount = 50;

 		if(req.body.gameOption === '3')
 			amount = 100;

 		if(req.body.winStatus === 0)
 		{	
 			winUser = req.body.player2;
 			lossUser = req.body.player1;
 		}

 		if(req.body.winStatus === 1)
 		{
 			winUser = req.body.player1;
 			lossUser = req.body.player2;
 		}

 		GameStats.update({
 			gameStatus : 1,
 			winStatus : req.body.winStatus
 		},
 		{
 			where : {
 				player1_id : req.body.player1,
 				player2_id : req.body.player2,
 				gameId : req.body.game,
 				gameOptionId : req.body.gameOption,
 				gameStatus : 0
 			}
 		}).then((winner) => {

 			//Winner Rating
 			Rating.findAll({
 				where : {
 					userId : winUser
 				},
 				raw : true
 			}).then((rate) => {

 				var winXp = rate[0].achivedXP + 100;

 				Rating.update({
	 				achivedXP : winXp
	 			},
	 			{
	 				where : {
	 					userId : winUser
	 				}
	 			}).then((ratingUpd)=> {

	 				Rating.findAll({
		 				where : {
		 					userId : winUser
		 				},
		 				raw : true
		 			}).then((rating) => {
		 				console.log("rating",rating)
		 				console.log("achivedXP", rating[0].achivedXP)
		 				console.log("targetXP", rating[0].targetXP)

		 				if(rating[0].achivedXP >= rating[0].targetXP)
		 				{
		 					var achivedXP = rating[0].achivedXP - rating[0].targetXP;
		 					var ratingLevel = rating[0].ratingLevel + 1;
		 					Rating.update({
		 						ratingLevel : ratingLevel,
		 						achivedXP : achivedXP
		 					},
		 					{
		 						where :{

		 							userId : winUser
		 						}
		 					})
		 				}
		 			})
	 			})

 			})
 			

 			// Losser Rating
			Rating.findAll({
 				where : {
 					userId : lossUser
 				},
 				raw : true
 			})
 			.then((rate) => {

 				var lossXp = rate[0].achivedXP + 30;

 				Rating.update({
	 				achivedXP : lossXp
	 			},
	 			{
	 				where : {
	 					userId : lossUser
	 				},
	 				raw : true
	 			}).then((ratingUpd)=> {
	 				Rating.findAll({
		 				where : {
		 					userId : lossUser
		 				},
		 				raw : true
		 			})
		 			.then((rating) => {
		 				if(rating[0].achivedXP >= rating[0].targetXP)
		 				{
		 					var achivedXP = rating[0].achivedXP - rating[0].targetXP;
		 					var ratingLevel = rating[0].ratingLevel + 1;
		 					Rating.update({
		 						ratingLevel : ratingLevel,
		 						achivedXP : achivedXP
		 					},
		 					{
		 						where :{

		 							userId : lossUser
		 						}
		 					})
		 				}
		 			});
	 			})

 			})

 			// Winner Coin
 			Coin.findAll({
 				where :{
 					userId : winUser
 				},
 				raw : true
 			}).then((coin) => {
 				console.log("coin",coin[0].currentCoins);

 				var totalWinningCoins = coin[0].totalWinningCoins + amount;
 				var currentCoins = coin[0].currentCoins + amount;
 				Coin.update({
	 				totalWinningCoins : totalWinningCoins,
	 				currentCoins : currentCoins
	 			},
	 			{
	 				where : {
	 					userId : winUser
	 				}
	 			});
 				
 			});

 			// Looser Coin

 			Coin.findAll({
 				where :{
 					userId : lossUser
 				},
 				raw : true
 			}).then((coin) => {

 				var currentCoins = coin[0].currentCoins - amount;
 				
 				if(currentCoins < 0)
 				{
 					currentCoins = 0;
 				}

 				Coin.update({
	 				currentCoins : currentCoins
	 			},
	 			{
	 				where : {
	 					userId : lossUser
	 				}
	 			});
 			});

 			var data = {
				status: 200, 
				error: false,
				message: "", 
				data: winner 
			};

			res.status(200).send(data);

 		}).catch((err)=> console.log(err))

 	}catch(err){
 		throw err;
 	}
 }

