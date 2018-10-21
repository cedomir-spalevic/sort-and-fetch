module.exports = function(app, port, records) {

    // start server
    app.listen(port);
    console.log(`Sort-and-Fetch RESTful API server runing on port ${port}\n`);

    // accept a record, or json array of records in any of the correct formats
    app.post('/records', (request, response) => {
        records.AddRecords(request);
        response.send('Success');
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