const User = require('./../models/userModel');
const Admin = require('./../models/adminModel');


exports.middleware =(req, res, next) => {
	var token = req.headers.authorization;
	console.log("token",token)
	console.log(req.path)
	var pathIndex = req.path.split('/');
	 var _ = require('underscore')
      , nonSecurePaths = ['/', '/api/game-option','/api/login', '/api/signup','/api/forget-password','/api/install','/api/user-coin'];

     var _user = require('underscore')
     	, userPaths = ['/api/coin-offers','/api/user-detail','/api/user-profile-upload','/api/challenge','/api/user-challenge','/api/player-status','/api/challenge-reject','/api/challenge-accept','/api/rematch-accept','/api/game-result','/api/tictactoe','/api/chainreaction','/api/result','/api/paypal-details','/api/keep-alive'];

     var _admin = require('underscore')
     	, adminPaths = ['/api/offer','/api/offer-details','/api/user-details','/api/dashboard','/api/payment-details','/api/offer-delete'];

  if (pathIndex[1]	==='assets') { return next(); }
  if ( _.contains(nonSecurePaths, req.path) ) { return next(); }
  if(_user.contains(userPaths,req.path)) {

  		 	User.findAll({
		  		where: {
		  			userToken : token
		  		},
		  		raw: true
		  	}).then((auth) => {
		  		if(auth == "")
		  		{
		  			console.log("Please login first");
		  			var data = {
	 					status : 200,
	 					error : true,
	 					message : "Please login first",
	 					data : []
 					};

 					res.status(200).send(data);
				  	res.end();
		  		}
		  		else {
		  			console.log("User varified", auth);
		  			next();
		  		}
		  	}).catch(() => {
		  		var data = {
	 					status : 200,
	 					error : true,
	 					message : "User not verified!",
	 					data : []
 					};

 				res.status(200).send(data);
		  		res.end();
		  	})
  }
  if(_admin.contains(adminPaths,req.path)) {

  		 	Admin.findAll({
		  		where: {
		  			userToken : token
		  		},
		  		raw: true
		  	}).then((auth) => {
		  		if(auth == "")
		  		{
		  			console.log("Please login first");
		  			var data = {
	 					status : 200,
	 					error : true,
	 					message : "Please login first",
	 					data : []
 					};

 					res.status(200).send(data);
				  	res.end();
		  		}
		  		else {
		  			console.log("User varified", auth);
		  			next();
		  		}
		  	}).catch(() => {
		  		var data = {
	 					status : 200,
	 					error : true,
	 					message : "User not verified!",
	 					data : []
 					};

 				res.status(200).send(data);
		  		res.end();
		  	})
  }
}


