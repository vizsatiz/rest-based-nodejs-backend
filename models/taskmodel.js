// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// create a schema
var taskSchema = new Schema({

  title: String,
  description: String,
  location: String,
  owner: {type: ObjectId, ref: 'User'},
  reward: Number,
  expiry: Date,
  bids: [{type: ObjectId, ref: 'Bids'}],
  created_at: Date,
  updated_at: Date
  
});

// on every save, add the date
taskSchema.pre('save', function(next) {
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
var Task = mongoose.model('Task', taskSchema);

// make this available to our users in our Node applications
module.exports = Task;