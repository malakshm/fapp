
var User = require('../../backend/mongoSchema/user.js')('MODEL');

 function UserController(){

 }

//define an action -- save the data
  UserController.prototype.addUser = function(req, res){
    var user = new User({
      firstName : req.body.fName,
      lastName : req.body.lName,
      phone : {
        mphone : req.body.phone.mobile,
        lphone : req.body.phone.landline,
        hphone : req.body.phone.home
     }
    });

    console.log("Mobile Phone -->" + user.phone.mphone);
    user.save(function(err){
      if(err) {
            console.log('Error while saving user: ' + err);
            res.send({ error:err });
            return;
          } else {
            console.log("User created");
            return res.send({ status: 'OK'});
         }
    });
  };

//find one user by first name
UserController.prototype.findUserByFirstName = function(req,res){
  console.log('-->' + req.params.name);
  console.log('body.finduser  -->' + req.body.finduser);
  
  return User.find( {'firstName' : req.params.name }, function(err,users){
  if(!err) {
        return res.send(users);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }

  });
}

//find all users
UserController.prototype.findAllUsers = function(req, res) {
    console.log("GET - /users");
    return User.find(function(err, users) {
      if(!err) {
        return res.send(users);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  module.exports = new UserController();
