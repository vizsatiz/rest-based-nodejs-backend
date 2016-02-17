var config = require('../config/serverconfig.js');

var basicAuth = {

	basicauth : function(req,res,next){
		var auth;
		console.log("baic Auth Failed :"+JSON.stringify(req.headers));
		console.log("baic Auth Failed :"+JSON.stringify(req.body));
    	// check whether an autorization header was send    
	    if (req.headers.authorization) {
	      // only accepting basic auth, so:
	      // * cut the starting "Basic " from the header
	      // * decode the base64 encoded username:password
	      // * split the string at the colon
	      // -> should result in an array
	      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
	    }
	    // checks if:
	    // * auth array exists 
	    // * first value matches the expected user 
	    // * second value the expected password
	    if (!auth || auth[0] !== config.basicauth.username || auth[1] !== config.basicauth.password) {
	    	
	        // any of the tests failed
	        // send an Basic Auth request (HTTP Code: 401 Unauthorized)
	        res.statusCode = 401;
	        // MyRealmName can be changed to anything, will be prompted to the user
	        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
	        // this will displayed in the browser when authorization is cancelled
	        res.json({
	          "status": 401,
	          "message": "Unknown Source"
	        });
	    } else {
	        // continue with processing, user was authenticated
	        next();
	    }
	}
}

module.exports = basicAuth;