var express = require('express');
var config = require('../config/serverconfig.js');
var Chats = require('../models/chatmodel.js');

var chat = {
  
  getById : function(req,res){
  	var user = req.params.id;
  	var query = { 
					$and : [{
						$or : [{
							chatter : user
						},{
							accepter : user
						}]
					},{
						open : true
					}]
				}
  	Chats.find(query).lean().populate("chatter").populate("accepter").populate("task").exec(function(err, chats) {
      if (err) throw err;
        var options_chatowner = {
	        path : 'chats.chatowner',
	        model : 'User'
		}
	    Chats.populate(chats,options_chatowner,function(err,chats){
	    	if (err) throw err;
	    	var options_owner = {
		        path : 'task.owner',
		        model : 'User'
			}
	        Chats.populate(chats,options_owner,function(err,chats){
	        	if (err) throw err;
	        	var options_bids = {
	        		path : 'task.bids',
		        	model : 'Bids'
	        	}
	        	Chats.populate(chats,options_bids,function(err,chats){
	        		if (err) throw err;
		        	var options_bidder = {
		        		path : 'task.bids.bidder',
			        	model : 'User'
		        	}
			        Chats.populate(chats,options_bidder,function(err,chats){
			        	if (err) throw err;
			        	console.log("Populated everything : ");
			        	res.json(chats);
			        });	
	        	})
	        });
	    });
    });       
  },

  removeChatObject = function(req,res){
  	var chatId = res.params.id;
  	Chats.findByIdAndRemove(chatId, function(err) {
      if (err) throw err;
      // we have deleted the task
      res.send({"deleted" : id});
    });
  }
}
module.exports = chat;	 
