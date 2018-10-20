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
                Favorite Color: ${record.color},
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
             */

             // values to be used for comparison
             var leftValue, rightValue;
            
            // if records have the same gender - then we compare the last names
            if(left.gender === right.gender) {
                leftValue = left.lastName;
                rightValue = right.lastName;
            }
            // if records gender are not the same
            else {
                leftValue = left.gender;
                rightValue = right.gender;
            }

            // F comes before M (which is ascending order), so we can use the same comparison for both
            // last names and gender
            if(leftValue < rightValue) return -1;
            else if(leftValue > rightValue) return 1;
            else return 0;
        });
        this.viewAllRecords();
    }

    sortRecordsByBirthDate() {
        this.records = this.records.sort( (left, right) => {
            /**
             * Sort Compare Function
             * If Result is < 0, left will go before right
             * If Result is > 0, right will go before left
             * 
             * Sort By Birth Date Ascending
             * 
             * First by year,
             * Second by month,
             * last by day
             */

            // Assumption: dates were already in format M/D/YYYY when in the file
            var leftDate = left.dateOfBirth.split('/');
            var rightDate = right.dateOfBirth.split('/');

            // get month, day and year
            var leftMonth = parseInt(leftDate[0]);
            var leftDay = parseInt(leftDate[1]);
            var leftYear = parseInt(leftDate[2]);
            var rightMonth = parseInt(rightDate[0]);
            var rightDay = parseInt(rightDate[1]);
            var rightYear = parseInt(rightDate[2]);

            // values to be used for comparison
            var leftValue, rightValue;

            // if records dont have the same year, then we compare the year
            if(leftYear !== rightYear) {
                leftValue = leftYear;
                rightValue = rightYear;
            }
            // if records have the same year but dont have the same month, then compare the month
            else if(leftMonth !== rightMonth) {
                leftValue = leftMonth;
                rightValue = rightMonth;
            }
            // if records have the same year and same month then compare the days
            else {
                leftValue = leftDay;
                rightValue = rightDay;
            }

            // sort birth date by ascending, so which ever is smaller will go first
            if(leftValue < rightValue) return -1;
            else if(leftValue > rightValue) return 1;
            else return 0;
        });
        this.viewAllRecords();
    }

}

module.exports = Records;