const User = require('./../models/userModel');
var Offer = require('./../models/offerModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var totalCount = {
	ongoingOffer : 0,
	upcommingOffer : 0,
	totalUser : 0
};

/**
 * this function will send offer and user count.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.dashboard = (req,res) => {
 	try {

 		var today = new Date();
		var sDate = today.getFullYear() + "-" + d2(parseInt(today.getMonth()+1)) + "-" + d2(today.getDate()) + " " + d2(today.getHours()) + ":" + d2(today.getMinutes()) + ":" + d2(today.getSeconds());
	
 		Offer.count({
 			where: {
			 	startDate: {
			 		[Op.lte] : sDate
			 	},
			 	endDate: {
			 		[Op.gte]: sDate
			 	}
		  	}
 		}).then((ongoing) => {
 			totalCount['ongoingOffer'] = ongoing
 		})

 		Offer.count({
 			where : {
 				startDate : {
 					[Op.gte]: sDate
 				}
 			}
 		}).then((upcomming) => {
 			totalCount['upcommingOffer'] = upcomming
 		})

 		User.count().then((user) => {
 			totalCount['totalUser'] = user
 		})
 		
 		var data = {
 			status : 200,
 			error : false,
 			message : "",
 			data : totalCount
 		}

 		res.status(200).send(data);

 	} catch(err){
 		throw err;
 	}
 }