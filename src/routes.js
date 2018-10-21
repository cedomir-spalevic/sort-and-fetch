module.exports = function(app, port, records) {

    //app.use(express.bodyParser());

    // start server
    app.listen(port);
    console.log(`Sort-and-Fetch RESTful API server runing on port ${port}\n`);

    // accept a record, or json array of records in any of the correct formats
    app.post('/records', (request, response) => {
        var body = '';
        request.setEncoding('utf8');
        request.on('data', function(chunk) {
            body += chunk;
        }).on('end', function() {
            try {
                records.parseJSON(body);
                response.send('Success');
            }
            catch(error) {
                response.send(error);
            }
        });
    });

    // returns all records in json format, sorted by gender
    app.get('/records/gender', (request, response) => {
        response.send(records.sortedRecordsByGender);
    });
    
    // returns all records in json format, sorted by birth date
    app.get('/records/birthdate', (request, response) => {
        response.send(records.sortedRecordsByBirthDate);
    });
    
    // returns all records in json format, sorted by last name
    app.get('/records/name', (request, response) => {
        response.send(records.sortedRecordsByLastName);
    });
}