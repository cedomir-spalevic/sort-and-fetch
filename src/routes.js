module.exports = function(app, port, records) {

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
            // attempt to parse the JSON and add records
            records.parseJSON(body).then( recordsResponse => {
                response.send(recordsResponse);
            }).catch( error => {
                response.send(error);
            });
        });
    });

    // returns all records in json format, sorted by gender
    app.get('/records/gender', (request, response) => {
        response.send(records.getRecordsSortedByGender());
    });
    
    // returns all records in json format, sorted by birth date
    app.get('/records/birthdate', (request, response) => {
        response.send(records.getRecordsSortedByBirthDate());
    });
    
    // returns all records in json format, sorted by last name
    app.get('/records/name', (request, response) => {
        response.send(records.getRecordsSortedByLastName());
    });
}