var async = require("async");

 /**
 * this function will install all the database
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

	exports.installSetup = (req,res) => {
		async.series([
		    function(callback) {
		        require('./../database/seeder/userSeeder')
		        console.log('user async')
		        callback(null, 'User table is created!');
		    },
		    function(callback) {
		        require('./../database/seeder/adminSeeder')
		        console.log("Admin async")
		        callback(null, 'Admin table is created!');
		    },
		    function(callback) {
		        require('./../database/seeder/offerSeeder')
		        console.log("Offer async")
		        callback(null, 'Offer table is created!');
	    	},
	    	function(callback) {
		        require('./../database/seeder/gameSeeder')
		        console.log("Game async")
		        callback(null, 'Game table is created!');
	    	},
	    	function(callback) {
		        require('./../database/seeder/gameOptionSeeder')
		        console.log("GameOption async")
		        callback(null, 'GameOption table is created!');
	    	},
	    	function(callback) {
		        require('./../database/seeder/ratingSeeder')
		        console.log("Rating async")
		        callback(null, 'Rating table is created!');
	    	},
	    	function(callback) {
		        require('./../database/seeder/coinSeeder')
		        console.log("Coin async")
		        callback(null, 'Coin table is created!');
	    	},
	    	function(callback) {
		        require('./../database/seeder/paymentSeeder')
		        console.log("Payment async")
		        callback(null, 'Payment table is created!');
	    	},
	    	function(callback) {
		        require('./../database/seeder/gameStatsSeeder')
		        console.log("GameStats async")
		        callback(null, 'GameStats table is created!');
	    	},
	    	function(callback) {
		        require('./../database/seeder/challengeSeeder')
		        console.log("Challenge async")
		        callback(null, 'Challenge table is created!');
	    	}

		],
		// optional callback
		function(err, results) {
		    // results is now equal to ['one', 'two']
		    console.log("installation Result", results);
		    res.status(200).send("installation Successfull");
		});
	}