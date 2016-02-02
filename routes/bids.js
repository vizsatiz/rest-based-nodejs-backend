// if our user.js file is at app/models/user.js
var Bid = require('../models/bidmodel.js');

var bids = { 

  getAll: function(req, res) {
    Bid.find({}, function(err, bids) {
      if (err) throw err;
      res.json(bids);
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    Bid.findById(id, function(err, bids) {
      if (err) throw err;
      res.json(bids);
    });
  },
 
  create: function(req, res) {
    var newbid = req.body;
    // create a new review
    var newBid = Bid({
      bidder: newbid.bidder,
      task: newbid.task,
      amount:newbid.amount
    });
    // save the review
    newBid.save(function(err) {
      if (err) throw err;
      res.json({"id" : newBid.id });
    });
  },
 
  update: function(req, res) {
    var updatebid = req.body;
    var id = req.params.id;
    Bid.findById(id, function(err, bid) {
      if (err) throw err;

      bid.bidder =  updatebid.bidder;
      bid.task = updatebid.task;
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

module.exports = reviews;