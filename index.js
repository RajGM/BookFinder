//import env
require('dotenv').config();

//importing libraries
const express = require('express');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// Define our application
const app = express();

// Set 'port' value to either an environment value PORT or 8000
app.set('port', process.env.PORT || 3000);

//for frontEnd CSS and JS files 
app.use(express.static(__dirname + '/public'));

//Middleware for bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

const db = `${process.env.mongoURL}${process.env.mongoUserName}:${process.env.mongoPassword}${process.env.mongoRestUrl}`;

mongoose
    .connect(db,{  useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected Successfully"))
    .catch(err => console.log(err));

// Router listens on / (root)
const route = require('./router');
app.use('/', route);

const addBook = require('./app/router/addBook');
app.use('/addBook', addBook);

const invalidRoute = require('./app/router/invalidRoute');
app.use('*', invalidRoute);

//starting server
app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
    console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port'));
});