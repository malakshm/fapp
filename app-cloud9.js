var express        = require('express');
var connect = require("connect");
var serveStatic = require("serve-static");
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose        = require("mongoose");
var path = require("path");
//var mongoose        = require("mongoskin");
var cookieParser = require('cookie-parser');
var session = require('express-session');

var cors = require('cors');


var app            = express();
//var app = connect();

app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}))
console.log("__dirname -->" + __dirname );
app.use(express.static(__dirname ));
console.log(__dirname);
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cors());


//app.use(app.router);
var routes = 	require('./routes/routes')(app);
//routes = require('./routes/tshirt')(app);

//connect to Mongo through Mongoose
mongoose.connect('mongodb://malakshm-ckaizen-1117898/test', function(err, res) {
//  mongoose.db('', function(err,res ){
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});



app.listen(process.env.PORT, process.env.IP);
//console.log('Im listening on port - ' + process.env.IP + ':/' +  process.env.PORT );
console.log("https://" + process.env.IP + ':' + process.env.PORT);

// First example router
app.get('/', function(req, res) {
  res.sendFile('layout.html');
});


