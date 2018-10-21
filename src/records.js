var readLine = require('readline');
var fs = require('fs');

/**
 * Keeps track of Records
 */
class Records {

    constructor() {
        this.records = [];
        this.sortedRecordsdByGender = [];
        this.sortedRecordsByBirthDate = [];
        this.sortedRecordsByLastName = [];
        this.genderRecordsNeedsUpdate = false;
        this.birthDateRecordsNeedsUpdate = false;
        this.lastNameRecordsNeedsUpdate = false;
    }

    /**
     * Attempts to parse a file and add the records
     * 
     * @param {*} path 
     */
    parseFile(path) {

        // promise to check if the file exists and is readable
        var fileCorrect = new Promise( (resolve, reject) => {
            fs.access(path, fs.constants.F_OK | fs.constants.R_OK, (error) => {
                if(error) {
                    var message;
                    if(error.code === 'ENOENT') {
                        message = `${path} does not exist. Please make sure you entering the correct file path.`;
                    }
                    else {
                        message = `${path} is not readable. Pleaes check the file permissions.`;
                    }
                    reject(message);
                } else {
                    resolve();
                }
            });
        });

        fileCorrect.then( () => {
            //do the parsing stuff
        }).catch( function(error) {
            setTimeout(function() {
                throw error;
            });
        });

        // check if the file exists
        /*fs.access(path, fs.constants.F_OK, (error) => {
            if(error) {
                throw `${path} does not exist. Please make sure you entering the correct file path.`;
                return;
            }
        }).then( () => {
            console.log("here");
            // check if the file is readable
            fs.access(path, fs.constants.R_OK, (error) => {
                if(error) {
                    throw `${path} is not readable. Pleaes check the file permissions.`;
                    return;
                }
            });
        });*/

        // check if the file is readable
        /*fs.access(path, fs.constants.R_OK, (error) => {
            if(error) {
                throw `${path} is not readable. Pleaes check the file permissions.`;
                return;
            }
        }); */

        
        // we know that every file will be stored in the same format
        // so we must determine the delimiter
        var delim = '';

        // read file line by line
        /*readLine.createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity
        }).on('line', (line) => {
            // if delimiter is unknown, find it
            if(delim === '') {
                if(line.split(',').length !== 1) delim = ',';
                else if(line.split('|').length !== 1) delim = '|';
                else if(line.split(' ').length !== 1) delim = ' ';
                else throw "Incorrect file format.";
            }

            // add the record
            this.addRecord(line, delim);
        }); */

        // records needs updating
        this.genderRecordsNeedsUpdate = true;
        this.birthDateRecordsNeedsUpdate = true;
        this.lastNameRecordsNeedsUpdate = true;
    }

    /**
     * Attempts to parse a JSON object (or array) coming from a POST request and the add records
     * 
     * @param {*} json 
     */
    parseJSON(json) {
        var content;

        try {
            content = JSON.parse(content);
        }
        catch(error) {
            console.log(error.message);
        }
    }

    /**
     * Adds a record that is in any of the accepted formats
     * 
     * @param {*} line 
     * @param {*} delim 
     */
    addRecord(line, delim) {
        // get the record
        var record = line.split(delim);
            
        // make sure record is in the correct format
        if(record.length !== 5) {
            throw "Incorrect record format. Please make sure your record are in the format of:\n"+
                    "LastName <delim> FirstName <delim> Gender <delim> Color <delim> DateOfBirth (M/D/YYYY)\n";
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
    }

    /**
     * Sort Records By Gender (female before male) then Last Name Ascending
     */
    sortRecordsByGender() {
        if(!this.genderRecordsNeedsUpdate) return;
        this.sortedRecordsdByGender = this.records.sort( (left, right) => {
            /**
             * Sort Compare Function
             * If Result is < 0, left will go before right
             * If Result is > 0, right will go before left
             * 
             * Sort By Gender (females before males), then by last name ascending (A - Z)
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
        this.genderRecordsNeedsUpdate = false;
    }

    /**
     * Sort Records by Birth Date Ascending
     */
    sortRecordsByBirthDate() {
        if(!this.birthDateRecordsNeedsUpdate) return;
        this.sortedRecordsByBirthDate = this.records.sort( (left, right) => {
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
        this.birthDateRecordsNeedsUpdate = false;
    }

    /**
     * Sort Records by Last Name Descending
     */
    sortRecordsByLastName() {
        if(!this.lastNameRecordsNeedsUpdate) return;
        this.sortedRecordsByLastName = this.records.sort( (left, right) => {
            /**
             * Sort Compare Function
             * If Result is < 0, left will go before right
             * If Result is > 0, right will go before left
             * 
             * Sort By Last Name Descending (Z - A)
             */

            // values to be used for comparison
            var leftValue = left.lastName;
            var rightValue = right.lastName;
            
            // we want to sort in descending order, so if the value is less than the other
            // then we want the greater one to come first
            if(leftValue < rightValue) return 1;
            else if(leftValue > rightValue) return -1;
            else return 0;
        });
        this.lastNameRecordsNeedsUpdate = false;
    }

    /**
     * Display Records
     * 
     * @param {*} records 
     */
    static displayRecords(records) {
        console.log(`Total Records Found: ${records.length}:\n`);
        records.forEach( (record) => {
            console.log(`
                Last Name: ${record.lastName},
                First Name: ${record.firstName},
                Gender: ${record.gender},
                Favorite Color: ${record.color},
                Date Of Birth: ${record.dateOfBirth}\n
            `);
        });
    }
}

module.exports = Records;