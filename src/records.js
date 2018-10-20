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
                "lastName": record[0].trimStart().trim(),
                "firstName": record[1].trimStart().trim(),
                "gender": record[2].trimStart().trim(),
                'color': record[3].trimStart().trim(),
                'dateOfBirth': record[4].trimStart().trim(),
            };
            this.records.push(obj);

            // sort the records

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

    /**
     * Sort Records By Gender (female before male) then Last Name Ascending
     */
    sortRecordsByGender() {
        this.records = this.records.sort( (left, right) => {
            /**
             * Sort Compare Function
             * If Result is < 0, left will go before right
             * If Result is > 0, right will go before left
             * 
             * Sort By Gender (females before males), then by last name ascending
             * 
             * Ascending - A to Z
             * ASCII Value:
             * A = 65
             * Z = 90
             */

             var leftValue;
             var rightValue;
            
            // if records have the same gender - then we compare the last names
            if(left.gender === right.gender) {
                // get the ASCII value of the first character in the last name
                // and convert to uppercase so we make sure we are comparing the correct values
                leftValue = left.lastName[0].toUpperCase().charCodeAt();
                rightValue = right.lastName[0].toUpperCase().charCodeAt();
            }
            // if records gender are not the same
            else {
                // get the ASCII value of the first character in the gender
                // and convert to uppercase so we make sure we are comparing the correct values
                leftValue = left.gender[0].toUpperCase().charCodeAt();
                rightValue = right.gender[0].toUpperCase().charCodeAt();
            }

            // F comes before M (which is ascending order), so we can use the same comparison for both
            // last names and gender
            if(leftValue < rightValue) return -1;
            else if(leftValue > rightValue) return 1;
            else return 0;
        });
        this.viewAllRecords();
    }

}

module.exports = Records;