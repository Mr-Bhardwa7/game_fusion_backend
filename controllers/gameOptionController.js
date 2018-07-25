var GameOption = require('./../models/gameOptionModel');
const socketHelper = require('./../helpers/envHelper');
/**
 * this function will fetch all game option
 * @param  {[type]} res [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

 exports.gameOptions = (req,res) => {
 	try{


 		GameOption.findAll().then((gameOption)=> {
 			var data = {
				status: 200, 
				error: false,
				message: "", 
				data: gameOption 
			};

			res.status(200).send(data);
 		})

 	} catch(err){
 		throw err;
 	}
 }