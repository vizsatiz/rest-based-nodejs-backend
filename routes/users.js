// if our user.js file is at app/models/user.js
var User = require('../models/usermodel.js');

var users = { 
  getAll: function(req, res) {
    User.find({}, function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    User.findById(id, function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  },
 
  create: function(req, res) {
    console.log("Request Body : "+ JSON.stringify(req.body));
    var newuser = req.body;
    // validate payload
    if(newuser.name == undefined || newuser.username == undefined || newuser.password == undefined){
      res.status(302);
      res.json({
          "status": 302,
          "message": "Invalid payload"
      });
      return;
    }
    //56b455cde508f2ed10f3c222
    if(!newuser.admin)
        newuser.admin = false;
    // create a new user
    var newUser = User({
      name: newuser.name,
      username: newuser.username,
      password: newuser.password,
      admin: newuser.admin,
    });
    console.log(JSON.stringify(newuser));
    // Check whether the user already exists
    User.find({username : newUser.username},function(err,user){
      if(user.length != 0){
        res.status(302);
        res.json({
          "status": 302,
          "message": "Cannot create duplicate user"
        });
      }else{
        // save the user
        newUser.save(function(err) {
          if (err) throw err;
          res.json({"id" : newUser.id });
        });
      }  
    });      
  },
 
  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    User.findById(id, function(err, user) {
      if (err) throw err;
      user.name =  updateuser.name;
      user.username = updateuser.username;
      user.password = updateuser.password;
      user.save(function(err) {
        if (err) throw err;
        res.send({"updated" : user.id});
      });
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    // find the user with id 4
    User.findByIdAndRemove(id, function(err) {
      if (err) throw err;
      // we have deleted the user
      res.send({"deleted" : id});
    });
  }
}; 
module.exports = users;