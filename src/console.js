var Record = require('./records.js');

class Console {

    constructor(records) {
        this.stdin = process.openStdin();
        this.stdin.setEncoding('utf8');
        this.records = records;
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
                    "F) Exit\n");

        this.stdin.once('data', (input) => { 
            switch(input.trim()) {
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

        this.stdin.once('data', (path) => {
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
                })

            }).catch( error => {
                console.log(error);
                this.displayInstructions();
            });
        });
    }
}

module.exports = Console;