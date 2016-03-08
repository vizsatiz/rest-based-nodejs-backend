var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create a schema
var bidSchema = new Schema({
	
  bidder: {type: ObjectId, ref: 'User'},
  task: { type:ObjectId ,ref: 'Task'},
  amount: Number,
  bidstatus:Boolean,
  created_at: Date,
  updated_at: Date
  
});

// on every save, add the date
bidSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

// the schema is useless so far
// we need to create a model using it
var Bids = mongoose.model('Bids', bidSchema);

// make this available to our users in our Node applications
module.exports = Bids;