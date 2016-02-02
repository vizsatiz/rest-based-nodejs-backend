var jwt = require('jwt-simple');
var passwordHash = require('password-hash');
var User = require('../models/usermodel.js');

var auth = {
 
  login: function(req, res) {
 
    var username = req.body.username || '';
    var password = req.body.password || '';
   
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username);
   
    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    if (dbUserObj) {
 
      // If authentication is success, we will generate a token
      // and dispatch it to the client
      var passwordVerifiaction = passwordHash.verify(password,dbUserObj.password);
      if(passwordVerifiaction && dbUserObj.username == username){
        res.json(genToken(dbUserObj));    
      }else{
        res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      }  
    }
 
  },
 
  validate: function(_username) {
    User.find({username : _username},function(err,user){
      if(user.length == 0){
        return undefined;
      }else{
        return {
          username: user.username,
          password: user.password
        };
      }
    });
  }
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  },require('../config/secret')()); 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;