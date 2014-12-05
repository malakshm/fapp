
var User = require('../models/user.js');



module.exports = function(app) {

findAllUsers = function(req, res) {
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

    
	//define an action -- save the data
	addUser = function(req, res){
		console.log('1');
		var user = new User({
			firstName : req.body.firstName,
			lastName : req.body.lastName
		});

		user.save(function(err){
			if(err) {
		        console.log('Error while saving user: ' + err);
		        res.send({ error:err });
		        return;
		      } else {
		        console.log("User created");
		        return res.send({ status: 'OK', user:user});
		     }
		});
	};

	//Here you link the route and the action
	app.get('/users', findAllUsers);
	app.post('/user', addUser);

}


