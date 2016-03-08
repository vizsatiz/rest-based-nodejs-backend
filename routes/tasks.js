// if our user.js file is at app/models/user.js
var Tasks = require('../models/taskmodel.js');

var tasks = {
 
  getAll: function(req, res) {
    Tasks.find({}).lean().populate("owner").populate("bids").exec(function(err, tasks) {
      if (err) throw err;
      var options = {
        path : 'bids.bidder',
        model : 'User'
      }
    Tasks.populate(tasks,options,function(err,tasks){
        res.json(tasks);
      });      
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    Tasks.findOne({_id:id}).populate("owner").populate("bids").exec(function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  },

  promote : function(req,res){
     var body = req.body;
     var id = req.params.id;
     var promoter = body.promoter;
     if(promoter == undefined){
        res.status(302);
        res.json({
            "status": 302,
            "message": "Invalid payload"
        });
        console.log("Error invalid payload :");
        return;
     }
     Tasks.findById(id, function(err, task) {
      if (err) throw err;
      task.promotes.push(promoter);
      task.save(function(err) {
        if (err) throw err;
        res.send({"promoted" : task.id});
      });
    });
  },
 
  create: function(req, res) {
    var newtask = req.body;
    console.log("payload : " + JSON.stringify(newtask));
    if(newtask.title == undefined || newtask.reward == undefined || newtask.expiry == undefined){
        res.status(302);
        res.json({
            "status": 302,
            "message": "Invalid payload"
        });
        console.log("Error invalid payload :");
        return;
    }
    var newTask = Tasks({

      title: newtask.title,
      description: newtask.description,
      location: newtask.location,
      owner: newtask.owner,
      reward: newtask.reward,
      promotes : [],
      expiry:newtask.expiry,
      bids:[]

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
  },

  getTaskByUser: function(req,res){
    var userId = req.params.userId;
    Tasks.find({ owner : userId}).populate("bids").lean().exec(function(err, tasks){
      if (err) throw err;
      var options = {
        path : 'bids.bidder',
        model : 'User'
      }
      Tasks.populate(tasks,options,function(err,tasks){
          res.json(tasks);
      }); 
    });         
  }
};
 
module.exports = tasks;