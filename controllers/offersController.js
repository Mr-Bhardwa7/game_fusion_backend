var Offer = require('./../models/offerModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

d2 = (n) => {
		if(n<9) return "0"+n;
		return n;
	}


/**
 * this function will create new coins offers
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.createOffer = (req,res) => {
 	try{
	 		Offer.create({
				offerCoin: req.body.offerCoin,
				offerValue: req.body.offerValue,
				startDate: req.body.startDate,
				endDate: req.body.endDate
			}).then((Offer) => {
				var data = {
					status: 200, 
					error: false,
					message: "New offer succesfully created!", 
					data: Offer 
				};

				res.status(200).send(data);
			}).catch(() => {
				var data = {
					status: 200, 
					error: true,
					message: "Something went wrong!", 
					data: [] 
				};

				res.status(200).send(data);
			});
 	} catch(err) {
 			throw err;

 	}
 }

 /**
 * this function will display all coins offers
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.coinsOffer = (req,res) => {
 	try{

 		var today = new Date();
		var sDate = today.getFullYear() + "-" + d2(parseInt(today.getMonth()+1)) + "-" + d2(today.getDate()) + " " + d2(today.getHours()) + ":" + d2(today.getMinutes()) + ":" + d2(today.getSeconds());
	
		Offer.findAll({
			 where: {
			 	startDate: {
			 		[Op.lte] : sDate
			 	},
			 	endDate: {
			 		[Op.gte]: sDate
			 	}
		  	}
		}).then((offer) => {
			console.log("All users data", offer);

			var data = {
				status: 200, 
				error: false,
				message: "All coins offer", 
				data: offer
			};

			res.status(200).send(data);
		});

	}catch(err){
		throw err;
	}
 }


  /**
 * this function will display all coins offers to Admin
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.offerDetails = (req,res) => {
 	try{

		Offer.findAll().then((offer) => {
			var data = {
				status: 200, 
				error: false,
				message: "All coins offer", 
				data: offer
			};

			res.status(200).send(data);
		});

	}catch(err){
		throw err;
	}
 }


/**
 * this function will delete the offer by its id
 * @id  {[INTEGER]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.offerDelete = (req,res) => {
 	try{
 		// console.log("request result",req.params)
 		Offer.destroy({
		    where: {
		        id : req.body.id
		    }
		}).then(() => {
			var data = {
				status: 200, 
				error: false,
				message: "Offer succesfully deleted!", 
				data: []
			};

			res.status(200).send(data);
		}).catch(() => {
			var data = {
				status: 200, 
				error: true,
				message: "Something went wrong!", 
				data: []
			};

			res.status(200).send(data);
		})

 	} catch(err){
 		throw err;
 	}
 }
