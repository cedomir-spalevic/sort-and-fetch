var Records = require('./src/records.js');
var stdin = process.openStdin();

// records class to keep track of our records
var records = new Records();

displayInstructions();

// begin command line listener to get user input
stdin.addListener("data", function(input) {

    console.log("You entered: " + input);
    process.stdin.destroy();

});

/**
 * Display instructions
 */
function displayInstructions() {
    console.log(`
        What would you like to do?
        A) Add more records
        B) View all records
        C) Get records sorted by gender
        D) Get records sorted by birth date
        E) Get records sorted by name
        F) Exit
    `);
}