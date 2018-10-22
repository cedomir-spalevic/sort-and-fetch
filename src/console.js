var RestTest = require( './rest-test.js');
var Record = require('./records.js');

class Console {

    constructor(records, port) {
        this.stdin = process.openStdin();
        this.stdin.setEncoding('utf8');
        this.records = records;
        this.port = port;
    }

    /**
     * Display Main Instructions
     */
    displayInstructions() {
        console.log("What would you like to do?\n"+
                    "A) Add more records\n"+
                    "B) View all records\n"+
                    "C) Get records sorted by gender\n"+
                    "D) Get records sorted by birth date\n"+
                    "E) Get records sorted by name\n"+
                    "F) Test REST API\n"+
                    "G) Exit\n");

        this.stdin.once('data', input => { 
            switch(input.toUpperCase().trim()) {
                case "A":
                    this.addMoreRecords();
                    break;
                case "B":
                    Record.displayRecords(this.records.records);
                    this.displayInstructions();
                    break;
                case "C":
                    Record.displayRecords(this.records.getRecordsSortedByGender());
                    this.displayInstructions();
                    break;
                case "D":
                    Record.displayRecords(this.records.getRecordsSortedByBirthDate());
                    this.displayInstructions();
                    break;
                case "E":
                    Record.displayRecords(this.records.getRecordsSortedByLastName());
                    this.displayInstructions();
                    break;
                case "F":
                    this.testRESTApi();
                    break;
                case "G":
                    console.log("Goodbye!");
                    process.exit();
                    break;
                default:
                    console.log("Invalid input. Please try again.");
                    this.displayInstructions();
                    break;
            };
        });
    }

    /**
     * Accept a file path, parse the file, and add the records
     */
    addMoreRecords() {
        console.log("Please enter the path to the file containing the records you would like to add:");

        this.stdin.once('data', path=> {
            path = path.trim().replace(/\r?\n|\r/g, '');

            // first check if the file exists
            this.records.fileExists(path).then( () => {

                // attempt to parse the file and add the records
                this.records.parseFile(path).then( (response) => {
                    console.log(response);
                    this.displayInstructions();
                }).catch( error => {
                    console.log(error);
                    this.displayInstructions();
                });

            }).catch( error => {
                console.log(error);
                this.displayInstructions();
            });
        });
    }

    /**
     * Test the REST API
     */
    testRESTApi() {
        console.log("\nWhat would you like to do?\n"+
                    "A) Test POST /records\n"+
                    "B) Test GET /records/gender\n"+
                    "C) Test GET /records/birthdate\n"+
                    "D) Test GET /records/name\n"+
                    "E) Go Back to Console App\n");

        this.stdin.once('data', input => {
            switch(input.toUpperCase().trim()) {
                case "A":
                    this.testPost();
                    break;
                case "B":
                    this.testGETRequest("/records/gender");
                    break;
                case "C":
                    this.testGETRequest("/records/birthdate");
                    break;
                case "D":
                    this.testGETRequest("/records/name");
                    break;
                case "E":
                    console.log("Back to Console App!\n");
                    this.displayInstructions();
                    break;
            };
        });
    }

    /**
     * Each test GET Request is calling the same function but with a different endpoint
     */
    testGETRequest(endpoint) {
        RestTest.testGETRequest(this.port, endpoint).then( response => {
            console.log(`Testing GET ${endpoint} -> Success!\n`);
            Record.displayRecords(JSON.parse(response));
            this.testRESTApi();
        }).catch( error => {
            console.log(error);
            this.testRESTApi();
        });
    }

    /**
     * Test the POST API
     */
    testPost() {
        console.log("\nWhat would you like to do?\n"+
                    "A) Test JSON Array with comma delimiter (/records/comma-array.json)\n"+
                    "B) Test JSON Array with pipe delimiter (/records/pipe-array.json)\n"+
                    "C) Test JSON Array with space delimiter (/records/space-array.json)\n"+
                    "D) Test single record with comma delimiter (/records/comma-single.json)\n"+
                    "E) Test single record with pipe delimiter (/records/pipe=single.json)\n"+
                    "F) Test single record with space delimiter (/records/space-single.json)\n"+
                    "G) Go Back to Test REST API\n");

        this.stdin.once('data', input => {
            switch(input.toUpperCase().trim()) {
                case "A":
                    this.testPOSTRequest("records/comma-array.json");
                    break;
                case "B":
                    this.testPOSTRequest("records/pipe-array.json");
                    break;
                case "C":
                    this.testPOSTRequest("records/space-array.json");
                    break;
                case "D":
                    this.testPOSTRequest("records/comma-single.json");
                    break;
                case "E":
                    this.testPOSTRequest("records/pipe-single.json");
                    break;
                case "F":
                    this.testPOSTRequest("records/space-single.json");
                    break;
                case "G":
                    console.log("Back to Test REST API!\n");
                    this.testRESTApi();
                    break;
            };
        });
    }

    /**
     * Each test POST Request is calling the same function but with a different path
     */
    testPOSTRequest(path) {
        RestTest.testPOSTRequest(this.port, path).then( response => {
            console.log(response);
            this.testPost();
        }).catch( error => {
            console.log(error);
            this.testPost();
        });
    }
}

module.exports = Console;