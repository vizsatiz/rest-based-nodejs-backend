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
    var newuser = req.body;
    // create a new user
    var newUser = User({
      name: newuser.name,
      username: newuser.username,
      password: newuser.password,
      admin: true,
      location: newuser.location,
      meta:newuser.meta
    });
    // save the user
    newUser.save(function(err) {
      if (err) throw err;
      console.log("New user created : "+ newUser);
      res.json({"id" : newUser.id });
    });
  },
 
  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    User.findById(id, function(err, user) {
      if (err) throw err;
      user.name =  updateuser.name,
      user.username = updateuser.username,
      user.password = updateuser.password,
      user.location = updateuser.location,
      user.meta = updateuser.meta
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