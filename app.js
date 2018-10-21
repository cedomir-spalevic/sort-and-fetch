var Records = require('./src/records.js');
var Console = require('./src/console.js');
var routes = require('./src/routes.js');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// records class to keep track of our records
var records = new Records();

// console object to write to console and get user input
var commandLineApp = new Console(records);

// define REST API urls
routes(app, port, records);

// start console
commandLineApp.displayInstructions();