var Records = require('./src/records.js');
var Console = require('./src/console.js');

// records class to keep track of our records
var records = new Records();

// console object to write to console and get user input
var console = new Console(records);

// start console
console.displayInstructions();