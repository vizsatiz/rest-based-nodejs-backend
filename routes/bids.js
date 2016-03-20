// if our user.js file is at app/models/user.js
var Bid = require('../models/bidmodel.js');
var Tasks = require('../models/taskmodel.js');
var Chats = require('../models/chatmodel.js');

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

  getByQuery: function(req,res){
    var query = req.body.query;
    Bid.find(query, function(err, bids) {
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
      amount:newbid.amount,
      bidstatus:false
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
              res.json(newBid);
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
  },

  acceptBid : function(req, res){
    var id = req.params.id;
    var body = req.body;
    Bid.findById(id,function(err,bid){
      if(err) throw err;
      bid.bidstatus = true;    
      var newchatObject = Chats({
        accepter: body.accepter,
        chatter: body.chatter,
        chats:[],
        task: body.task
      });
      // save the user
      newchatObject.save(function(err) {
        if (err) throw err;
          bid.save(function(err){
          if(err) throw err;
          // creating chat object
          res.send({"status":"success"});
       });
      });
    });
  }
}; 

module.exports = bids;