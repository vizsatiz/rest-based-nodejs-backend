// if our user.js file is at app/models/user.js
var Bid = require('../models/bidmodel.js');
var Tasks = require('../models/taskmodel.js');

var bids = { 

  getAll: function(req, res) {
    Bid.find({}, function(err, bids) {
      if (err) throw err;
      res.json(bids);
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    Bid.findById(id).populate("task").populate("bidder").exec(function(err, bids) {
      if (err) throw err;
      res.json(bids);
    });
  },
 
  create: function(req, res) {
    var newbid = req.body;
    // create a new review
    if(newbid.bidder == undefined || newbid.amount == undefined || newbid.task == undefined){
      res.status(302);
      res.json({
          "status": 302,
          "message": "Invalid payload"
      });
    }
    var newBid = Bid({
      task: newbid.task,
      bidder: newbid.bidder,
      amount:newbid.amount
    });
    Tasks.findById(newBid.task, function(err, task) {
        if(err){
          res.status(302);
          res.json({
              "status": 302,
              "message": "Invalid payload : Task doesn't exist"
          });
        }else{
          newBid.save(function(err) {
            if (err) throw err;
            task.bids.push(newBid.id);
            task.save(function(err) {
              if (err) throw err;
              res.json({"id" : newBid.id});
            });            
          });
        }
    }); 
  },
 
  update: function(req, res) {
    var updatebid = req.body;
    var id = req.params.id;
    Bid.findById(id, function(err, bid) {
      if (err) throw err;
      bid.task = task;
      bid.bidder =  updatebid.bidder;
      bid.amount = updatebid.amount;

      bid.save(function(err) {
        if (err) throw err;
        res.send({"updated" : user.id});
      });
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    // find the review with id 4
    Bid.findByIdAndRemove(id, function(err) {
      if (err) throw err;
      // we have deleted the review
      res.send({"deleted" : id});
    });
  }
}; 

module.exports = bids;