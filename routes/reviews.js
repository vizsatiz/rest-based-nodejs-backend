// if our user.js file is at app/models/user.js
var Review = require('../models/reviewmodel.js');

var reviews = { 
  getAll: function(req, res) {
    Review.find({}, function(err, reviews) {
      if (err) throw err;
      res.json(reviews);
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    Review.findById(id, function(err, reviews) {
      if (err) throw err;
      res.json(reviews);
    });
  },
 
  create: function(req, res) {
    var newreview = req.body;
    // create a new review
    var newReview = Review({
      reviewer: newreview.reviewer,
      rating: newreview.rating
    });
    // save the review
    newReview.save(function(err) {
      if (err) throw err;
      res.json({"id" : newReview.id });
    });
  },
 
  update: function(req, res) {
    var updatereview = req.body;
    var id = req.params.id;
    Review.findById(id, function(err, review) {
      if (err) throw err;

      review.reviewer =  updatereview.reviewer;
      review.rating = updatereview.rating;

      review.save(function(err) {
        if (err) throw err;
        res.send({"updated" : user.id});
      });
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    // find the review with id 4
    Review.findByIdAndRemove(id, function(err) {
      if (err) throw err;
      // we have deleted the review
      res.send({"deleted" : id});
    });
  }
}; 

module.exports = reviews;