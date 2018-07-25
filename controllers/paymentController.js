var Payment  = require('./../models/paymentModel');
const User = require('./../models/userModel');
const Offer = require('./../models/offerModel');

 /**
 * this function will insert new purchase data
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */


exports.offerPurchase = (req,res) => {
	try{

		Payment.create({
				userId    : req.body.userId,
				offerId   : req.body.offerId,
				paymentId : req.body.paymentId,
				status    : req.body.paymentStatus
			})
		.then(() => {

			Coin.findAll({
 				where :{
 					userId : req.body.userId
 				},
 				raw : true
 			})
 			.then((coin) => {

 				var currentCoins = coin[0].currentCoins + req.body.offerCoin;

 				Coin.update({
	 				currentCoins : currentCoins
	 			},
	 			{
	 				where : {
	 					userId : req.body.userId
	 				}
	 			})
	 			.then((updatedCoin)=> {
	 				var data = {
						status: 200, 
						error: false,
						message: "New offer purchased!", 
						data: updatedCoin
					};

					res.status(200).send(data);
	 			})
 				
 			});

			})


	}catch(err){
		throw err;
	}
}


/**
 * this function will display all payment details to admin
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.paymentDetails = (req, res) => {
	try{

		Payment.findAll({
			include : [{
				model : User
			},
			{
				model : Offer
			}]
		})
		.then((result) => {
			console.log("paymentDetails",result)
			var data = {
				status : 200,
				error : false,
				message : "All payment details",
				data : result
			};

			res.status(200).send(data);
		});

	}catch(err){
		throw err;
	}
}