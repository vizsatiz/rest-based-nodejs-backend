var crypto = require('crypto');
var serverconfig = require('../config/serverconfig.js');

var encryptDecrypt = {

	encrypt : function(text){
		var cipher = crypto.createCipher(serverconfig.encryption.algorithm,serverconfig.encryption.key);
		var crypted = cipher.update(text,'utf8','hex');
		crypted += cipher.final('hex');
		return crypted;
	},

	decrypt : function(text){
		var decipher = crypto.createDecipher(serverconfig.encryption.algorithm,serverconfig.encryption.key);
		var dec = decipher.update(text,'hex','utf8');
		dec += decipher.final('utf8');
		return dec;
	}
}	

module.exports = encryptDecrypt;