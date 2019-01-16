# sort-and-fetch
 > Command Line App that reads a file containing records in different formats and sorts the records.
 > Comes with a REST API to access the same data
 
 ## Accepted formats
 1. Pipe Delimited
 ``` LastName | FirstName | Gender | FavoriteColor | DateOfBirth ```
 2. Comma Delimited
 ``` LastName, FirstName, Gender, FavoriteColor, DateOfBirth ```
 3. Space Delimited
 ``` LastName FirstName Gender FavoriteColor DateOfBirth ```
 
 ## REST API Endpoints
 1. Post /records           - Accepts a record, or a json array of records in any of the 3 above formats
              
              #### Accepted Formats for POST Request
              
              # single json record in any of the above formats
              "Last Name | First Name | Gender | Favorite Color | Date of Birth"
              
              # json array of records
              [
                "Last Name | First Name | Gender | Favorite Color | Date of Birth",
                "Last Name | First Name | Gender | Favorite Color | Date of Birth",
              ]
              
              
 2. GET /records/gender     - Returns all records in json format, sorted by gender (female before male), then last name ascending
 3. GET /records/birthdate  - Returns all records in json format, sorted by birth date ascending
 4. GET /records/name       - Returns all records in json format, sorted by name
 
 ## Notes
 1. One assumption I made is that every record in a file will be in the same format
 2. There are test cases in the records folder
    - json files are used for the POST request
    - txt files are used as input files to the command line application
 
 ## Requirements
NodeJS
https://nodejs.org/en/

## How To Run
``` bash
# run REST API on localhost:3000 and begin command line app!
npm start
```
