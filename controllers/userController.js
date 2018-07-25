const User = require('./../models/userModel');
const Admin = require('./../models/adminModel');
const Rating = require('./../models/ratingModel');
const GameStats = require('./../models/gameStatsModel');
const Coin = require('./../models/coinModel');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const helper = require('./../helpers/helper');
const socketHelper = require('./../helpers/envHelper')

const saltRounds = 10;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


/**
 * this function will register new user
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.register = (req,res) => {
	try{

		User.findAll({
			where : {
				userEmail: req.body.userEmail,
			}
		}).then((userExist) => {
			console.log("check user",userExist)
			if(userExist == "")
			{
				
				var hashPassword = bcrypt.hashSync(req.body.userPassword, saltRounds);
				var token = bcrypt.hashSync(req.body.userEmail, saltRounds);
				let first = Math.floor(Math.random()*(999-100+1)+100);
				let second = Math.floor(Math.random()*(999-100+1)+100);
				let third = Math.floor(Math.random()*(999-100+1)+100);
				let uniqueId = `${first}-${second}-${third}`;

					User.create({
						userName: req.body.userName,
						userEmail: req.body.userEmail,
						userPassword: hashPassword,
						userUniqueID: uniqueId,
						socialMediaAuth:req.body.socialMediaAuth,
						userProfilePath : req.body.userProfilePath,
						userToken:token
						}).then((success) => {
							var userid = success.dataValues.id;

							Rating.create({
								ratingLevel: 0,
								targetXP: 1000,
								achivedXP: 0,
								userId: userid
							})
							Coin.create({
								totalWinningCoins: 0,
								currentCoins: 200,
								userId: userid
							})

							var data = {
								status: 200, 
								error: false,
								message: "Account Succesfully created!", 
								data: success
							};
								res.status(200).send(data);
						})
		 } else {
				var data = {
					status: 200, 
					error: true,
					message: "User alredy exist!", 
					data: userExist 
				};

				res.status(200).send(data);
			}
		}) .catch(() => {
			var data = {
					status: 200, 
					error: true,
					message: "Something went wrong!", 
					data: []
				};

				res.status(200).send(data);
		})
	}catch(err) {
		throw err;
	}
}


/**
 * this function is used to push active user id into users array
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

	 
connected = (user) => {
 	if(socketHelper.users.includes(user) === false && user != 'undefined')
	socketHelper.users.push(user);

	console.log("new online user",socketHelper.users);
	
}



/**
 * this function will use for user login
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.login = (req,res) => {
 	try{

 		var username = req.body.userEmail;
 		var password = req.body.userPassword;
 		var table;
 		if(username == 'animesh@admin.in')
 		{
 			table = Admin;
 		}
 		else {
 			table = User;
 		}

 		table.findAll({
 			where: {
 				userEmail: username
 			}
 		}).then((userExist) => {
 			if(userExist != "")
 			{
 				var encrpPassword = bcrypt.compareSync(password, userExist[0].userPassword);
 				if(encrpPassword == true)
 				{
 					//socket code
 					connected(userExist[0].userUniqueID)
 				
 					var data = {
	 					status : 200,
	 					error : false,
	 					message : "User succesfully login",
	 					data : userExist
 					};

 					res.status(200).send(data);

 				} else {
 					var data = {
	 					status : 200,
	 					error : true,
	 					message : "Password does not match",
	 					data : []
 					};

 					res.status(200).send(data);
 				}
 			} else {

 				if(userExist[0].socialMediaAuth == true)
 				{

 					var hashPassword = bcrypt.hashSync(req.body.userPassword, saltRounds);
					var token = bcrypt.hashSync(req.body.userEmail, saltRounds);
					let first = Math.floor(Math.random()*(999-100+1)+100);
					let second = Math.floor(Math.random()*(999-100+1)+100);
					let third = Math.floor(Math.random()*(999-100+1)+100);
					let uniqueId = `${first}-${second}-${third}`;

					User.create({
						userName: req.body.userName,
						userEmail: req.body.userEmail,
						userPassword: hashPassword,
						userUniqueID: uniqueId,
						socialMediaAuth:req.body.socialMediaAuth,
						userProfilePath : req.body.userProfilePath,
						userToken:token
						}).then((success) => {
							var userid = success.dataValues.id;

							Rating.create({
								ratingLevel: 0,
								targetXP: 1000,
								achivedXP: 0,
								userId: userid
							})
							Coin.create({
								totalWinningCoins: 0,
								currentCoins: 200,
								userId: userid
							})

							var data = {
								status: 200, 
								error: false,
								message: "Account Succesfully created!", 
								data: success
							};
								res.status(200).send(data);
						})
 				}
 				
 			}
 		}).catch(()=> {
 			var data = {
		 		status : 200,
		 		error : true,
		 		message : "User not found",
		 		data : []
	 		};

	 		res.status(200).send(data);
 		})
 		
 	} catch(err) {
 		throw err;
 	}
 }


 /**
 * this function will use for send password to user via mail.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

sendMail = (to,message) => 
{
   var smtpConfig = {
      service: 'Gmail',
      auth: {
          user: 'gamefusion32@gmail.com',
          pass: 'gamefusion@32'
      }
   };
   var transporter = nodemailer.createTransport(smtpConfig);
   var mailOptions = {
      from: '"Game Fusion" <gamefusion32@gmail.com>', // sender address
      to: to, // list of receivers
      subject: 'Game Fusion - Reset password', // Subject line
      text: 'Hello world ?', // plaintext body
      html: message // html body
   };
   
   transporter.sendMail(mailOptions, function(error, info){
      if(error)
      {
         return console.log(error);
      }
      else
      {
         return console.log(info.response);
      }      
   }); 
}

  /**
 * this function will use handle forgot password.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.forgetPassword = (req,res) => {
	try{
		User.findAll({
			where: {
				userEmail : req.body.userEmail
			},
			raw : true
		}).then((result) => {
			if(result == "")
			{
				var data = {
	 					status : 200,
	 					error : true,
	 					message : "Email does not match",
	 					data : []
 					};

 					res.status(200).send(data);
 				}
 				else {
 					var email = result[0].userEmail;
 					var randomstring = Math.random().toString(36).slice(-8);
 					var hashPassword = bcrypt.hashSync(randomstring, saltRounds);
 					 User.update({
				        userPassword: hashPassword
				      },
				      {
				      	where : {
				      		userEmail : email
				      	}
				      }).then(() => {
				      	var message = `<p>Your new password is : ${randomstring}</p>`;
						sendMail(email,message);
						console.log("mail send Succesfully")
						var data = {
		 					status : 200,
		 					error : false,
		 					message : "New password send in your mail",
		 					data : []
	 					};

	 					res.status(200).send(data);
				      })
 				}
		})
	} catch(err){
		throw err;
	}
}



 /**
 * this function will display all user details to admin
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */


exports.userDetails = (req,res) => {
	try{
		User.findAll({
			include : [{
				model : Rating
			},
			{
				model : Coin
			}]
		})
		.then((result) => {
			// console.log("userDetails",result)
			var data = {
	 					status : 200,
	 					error : false,
	 					message : "All user details",
	 					data : result
 					};

 					res.status(200).send(data);
		})
		
	} catch(err) {
		throw err;
	}
}

userRecord = {
	result : [],
	totalGame : 0,
	totalWin : 0
}

/**
 * this function will display one user details to admin
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */


exports.userDetail = (req,res) => {
	try{
		User.findAll({
			where: {
				userToken : req.body.userToken,
				id : req.body.userId
			},
			raw : true,
			include : [{
				model : Rating
			},
			{
				model : Coin
			}]
		})
		.then((result) => {
			console.log("userDetails",result[0].id)
			userRecord['result'] = result;

			GameStats.count({
				where : {
					[Op.or] : {
						player1_id : {
							[Op.eq] : result[0].id
						},
						player2_id : {
							[Op.eq] : result[0].id
						}
					}
				}
			}).then((totalGame) => {
				userRecord['totalGame'] = totalGame
			})

			GameStats.count({
				where: {
					player1_id : result[0].id,
					winStatus : true
				}
			}).then((winStatus) => {
				userRecord['totalWin'] = winStatus
			})
		})

		var data = {
	 			status : 200,
	 			error : false,
	 			message : "All user details",
	 			data : userRecord
 			};

 			res.status(200).send(data);
		
	} catch(err) {
		throw err;
	}
}


/**
 * this function will display total number of current coins
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.currentCoin = (req, res) => {
	try{
		Coin.findAll({
			where: {
				userId : req.body.userid
			},
			raw : true
		}).then((result) => {
			if(result == "")
			{
				var data = {
	 					status : 200,
	 					error : true,
	 					message : "",
	 					data : []
 					};

 					res.status(200).send(data);	
			} else {
				var data = {
	 					status : 200,
	 					error : false,
	 					message : "",
	 					data : result
 					};

 					res.status(200).send(data);
			}
		});

	} catch(err){
		throw err;
	}
}


/**
 * this function will upload the profie picture
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.profileUpload = (req,res) => {
	try{
		console.log("path",req.file)
		User.update({
			userProfilePath : `assets/${req.file.filename}`
		},
		{
			where : {
			   id : req.body.userId
			}
		}).then((result) => {
			var data = {
	 		status  : 200,
	 		error   : false,
	 		message : "Image uploaded successfully",
	 		data    : [{path : `assets/${req.file.filename}`}]
 			};
			res.status(200).send(data);
			
		});

	} catch(err){
		throw err;
	}
}


/**
 * this function will keep user online
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.keepAlive = (req,res) => {
	try{
		connected(req.body.unq_id);

		var data = {
			status : 200,
			error  : false,
			message: "",
			data : []  
		}

		res.status(200).send(data);
	}catch(err){
		throw err;
	}
}
