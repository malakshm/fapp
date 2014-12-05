
var uController = require('../controller/userController.js');
var eController = require('../controller/eventsController.js');

module.exports = function(app) {
  //Link routes and actions
  app.post('/user', uController.addUser);
  app.get('/users', uController.findAllUsers);
  app.get('/users/:name', uController.findUserByFirstName);

  app.post('/event', eController.addEvent );

}