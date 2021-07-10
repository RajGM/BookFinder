//import env
require('dotenv').config();

//importing libraries
const express = require('express');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// Define our application
const app = express();

// Set 'port' value to either an environment value PORT or 3000
app.set('port', process.env.PORT || 8000);

//Middleware for bodyparser
app.use(bodyparser.urlencoded({
    extended: true
  }));
  app.use(bodyparser.json());

// Router listens on / (root)
var route = require('./router');
app.use('/', route);

//starting server
var server = app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
    console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port'));
  });