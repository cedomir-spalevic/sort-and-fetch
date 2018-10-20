var Records = require('./src/records.js');
var stdin = process.openStdin();
stdin.setEncoding('utf8');

// records class to keep track of our records
var records = new Records();

/**
 * Display Main Instructions
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

    stdin.once('data', function(input) {
        switch(input.trim()) {
            case "A":
                addMoreRecords();
                break;
            case "B":
                viewAllRecords();
                break;
            case "C":
                getRecordsByGender();
                break;
            case "D":
                getRecordsByBirthDate();
                break;
            case "E":
                getRecordsByName();
                break;
            case "F":
                console.log("Goodbye!");
                process.exit();
                break;
            default:
                console.log("Invalid input. Please try again.");
                break;
        };
    });
}

/**
 * Accept a file path, parse the file, and add the records
 */
function addMoreRecords() {
    console.log("Please enter the path to the file containing the records you would like to add:");

    stdin.once('data', function(path) {
        path = path.trim().replace(/\r?\n|\r/g, '');
        try {
            records.parseFile(path);
        } catch(error) {
            console.log(error);
        }
        displayInstructions();
    });
}

/**
 * View All Records
 */
function viewAllRecords() {
    records.viewAllRecords();

    displayInstructions();
}

function getRecordsByGender() {
    //display records sorted by gender

    displayInstructions();
}

function getRecordsByBirthDate() {
    //display records by birth date

    displayInstructions();
}

function getRecordsByName() {
    //display records by name

    displayInstructions();
}

displayInstructions();