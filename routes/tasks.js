// if our user.js file is at app/models/user.js
var Tasks = require('../models/taskmodel.js');

var tasks = {
 
  getAll: function(req, res) {
    Tasks.find({}, function(err, tasks) {
      if (err) throw err;
      res.json(tasks);
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    Tasks.findOne({_id:id}).populate("owner").exec(function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  },
 
  create: function(req, res) {
    var newtask = req.body;
    if(newtask.title == undefined || newtask.reward == undefined || newtask.expiry == undefined){
        res.status(302);
        res.json({
            "status": 302,
            "message": "Invalid payload"
        });
    }
    var newTask = Tasks({
      title: newtask.title,
      description: newtask.description,
      location: newtask.location,
      owner: newtask.owner,
      reward: newtask.reward,
      expiry:newtask.expiry,
    });
    // save the user
    newTask.save(function(err) {
      if (err) throw err;
      res.json({"id" : newTask.id });
    });
  },
 
  update: function(req, res) {
    var updateTask = req.body;
    var id = req.params.id;
    Tasks.findById(id, function(err, task) {
      if (err) throw err;
      task.title =  updateTask.title;
      task.description = updateTask.description;
      task.location = updateTask.location;
      task.owner = updateTask.owner;
      task.reward = updateTask.reward;
      task.expiry = updateTask.expiry; 
      task.save(function(err) {
        if (err) throw err;
        res.send({"updated" : task.id});
      });
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    Tasks.findByIdAndRemove(id, function(err) {
      if (err) throw err;
      // we have deleted the task
      res.send({"deleted" : id});
    });
  }
};
 
module.exports = tasks;