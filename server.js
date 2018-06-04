// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var https = require('https');                   //https server
var http = require('http');
var port     = process.env.PORT || 3003;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var fs = require('fs');                         //file system
// var fs = require('fs');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

 var configDB = require('./config/userdb.js');

var publicCert = fs.readFileSync('./config/cert/cert.pem', 'utf-8');
var privateKey = fs.readFileSync('./config/cert/key.pem', 'utf-8');
var httpPort = process.env.HTTPPORT || 80;
var httpsPort = process.env.HTTPSPORT || 443;

//
// // configuration ===============================================================
 mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
 app.use(session({ secret: 'statcart' })); // session secret
 app.use(passport.initialize());
 app.use(passport.session()); // persistent login sessions
 app.use(flash()); // use connect-flash for flash messages stored in session

// app.use(function(req, res, next) {
//     var reqType = req.headers["x-forwarded-proto"];
//     reqType == 'https' ? next() : res.redirect("https://" + req.headers.host + req.url);
// });


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


///////////////////////////////////////////////////////////////////////////////
// web server creation and startup
//
