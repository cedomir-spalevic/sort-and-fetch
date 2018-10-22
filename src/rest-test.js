var fs = require('fs');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/**
 * Test POST Request Endpoint
 */
function testPOSTRequest(port, path) {
    var content = fs.readFileSync(path, 'utf8');

    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:${port}/records`);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(content);
    });
}

/**
 * Test GET Request Endpoints
 * 
 * @param {*} port 
 * @param {*} endpoint 
 */
function testGETRequest(port, endpoint) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:${port + endpoint}`);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

module.exports.testPOSTRequest = testPOSTRequest;
module.exports.testGETRequest = testGETRequest;