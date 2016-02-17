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
    User.find({username : username}).lean().exec(function(err,user){
      if(user.length == 0){
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
      console.log("user object : "+ JSON.stringify(user));
      console.log("user name : "+ user[0].username);
      console.log("user name : "+ password);
      console.log("user name : "+ user[0].password);
      // If authentication is success, we will generate a token
      // and dispatch it to the client
      var passwordVerification = (password == user[0].password);
      console.log("p a s w :"+ passwordVerification);
      if(passwordVerification && user[0].username == username){
        user[0].password = "xxx";
        res.json(genToken(user));    
      }else{
        res.status(401);
        res.json({
           "status": 401,
           "message": "Invalid credentials"
        });
      }
    });
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    username : user[0].username
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