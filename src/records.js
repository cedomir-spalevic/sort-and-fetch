var fs = require('fs');

/**
 * Keeps track of Records
 */
class Records {

    constructor() {
        this.records = [];
        this.sortedByGender = [];
        this.sortedByBirthDate = [];
        this.sortedByName = [];
    }

    /**
     * Attempts to read a file given the path
     * 
     * @param {*} path 
     */
    parseFile(path) {
        var fileContent;

        // attempt to read the file
        try {
            fileContent = fs.readFileSync(path, 'utf8');
        }
        catch(err) {
            throw "Incorrect file path. Please make sure you are entering the correct path.\n";
        }

        // if file is real, attempt to add the records within the file
        this.addRecords(fileContent);
    }

    /**
     * Attempts to parse the contents of a file and add the records to the array
     * 
     * @param {*} content 
     */
    addRecords(content) {
        var delim = '';

        // go through each line in the file
        content.split('\n').forEach( (line) => {

            // if the delimiter is not known, we need to find out which format the file is in
            // if the file is not in the format of comma delimited, pipe delimited, or space delimited - throw an error
            if(delim === '') {
                if(line.split(',').length !== 1) delim = ',';
                else if(line.split('|').length !== 1) delim = '|';
                else if(line.split(' ').length !== 1) delim = ' ';
                else console.log("Incorrect file format.");
            }

            // get the record
            var record = line.split(delim);
            
            // make sure record is in the correct format
            if(record.length !== 5) {
                throw `Incorrect record format. Please make sure your record are in the format of:
                        LastName <delim> FirstName <delim> Gender <delim> Color <delim> DateOfBirth (M/D/YYYY)\n`;
            }

            // create record and add to array
            var obj = {
                "lastName": record[0],
                "firstName": record[1],
                "gender": record[2],
                'color': record[3],
                'dateOfBirth': record[4],
            };
            this.records.push(obj);
        });
    }

    /**
     * Display all records
     */
    viewAllRecords() {
        console.log(`Total Records Found: ${this.records.length}:\n`);
        this.records.forEach( (record) => {
            console.log(`
                Last Name: ${record.lastName},
                First Name: ${record.firstName},
                Gender: ${record.gender},
                Favorite Color: ${record.gender},
                Date Of Birth: ${record.dateOfBirth}\n
            `);
        });
    }

}

module.exports = Records;