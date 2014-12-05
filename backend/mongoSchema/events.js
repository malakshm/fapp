
var mongoose = require('../../middleware/node_modules/mongoose');
var userSchema = require('./user.js')('SCHEMA');
var userModel = require('./user.js')('MODEL');

var Schema = mongoose.Schema;


var Event = new Schema({
  
    name: {type:String},
    dateOfEvent : {type:String},
    startTime : {type:String},
    endTime : {type:String},
    moderator : {type:String},
    category : {type:String},
    feedbackattributes : {type:String},
    participants : [userSchema],
    //internalUID : {_id}

  	
});

module.exports = mongoose.model('Event', Event);