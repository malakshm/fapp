
var mongoose = require('../../middleware/node_modules/mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  
    firstName: {type:String},
    lastName: { type: String, trim: true },
    phone : {
    	mphone : {type:String},
    	lphone : {type:String},
    	hphone : {type :String}
    }
  
});

module.exports = function( schemaOrModel ){
	
	if( schemaOrModel === 'MODEL'){
		return mongoose.model('User', User);
	}else{
		return User;
	}
}
