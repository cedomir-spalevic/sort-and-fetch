
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
        console.log(`
            What would you like to do?
            A) Add more records
            B) View all records
            C) Get records sorted by gender
            D) Get records sorted by birth date
            E) Get records sorted by name
            F) Exit
        `);

        this.stdin.once('data', (input) => { 
            switch(input.trim()) {
                case "A":
                    this.addMoreRecords();
                    break;
                case "B":
                    this.records.viewAllRecords();
                    this.displayInstructions();
                    break;
                case "C":
                    this.records.sortRecordsByGender();
                    this.displayInstructions();
                    break;
                case "D":
                    this.records.sortRecordsByBirthDate();
                    this.displayInstructions();
                    break;
                case "E":
                    this.records.sortRecordsByLastName();
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
            try {
                this.records.parseFile(path);
            } catch(error) {
                console.log(error);
            }
            this.displayInstructions();
        });
    }
}

module.exports = Console;