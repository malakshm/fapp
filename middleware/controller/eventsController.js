
var Event = require('../../backend/mongoSchema/events.js');

 function EventController(){

 }

//define an action -- save the data
  EventController.prototype.addEvent = function(req, res){
    var event = new Event({
        name: req.body.name,
        dateOfEvent : req.body.dateOfEvent,
        startTime :  req.body.startTime,
        endTime : req.body.endTime,
        moderator : req.body.moderator,
        category : req.body.category,
        feedbackattributes : req.body.feedbackattributes,
        participants : req.body.participants

    });

    console.log("Event Name -->" + event.name);
    event.save(function(err){
      if(err) {
            console.log('Error while saving event: ' + err);
            res.send({ error:err });
            return;
          } else {
            console.log("Event created");
            return res.send({ status: 'OK'});
         }
    });
  };



  module.exports = new EventController();
