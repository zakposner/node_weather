const request = require('request');

// 1st argument: the value taken from the command line address command
// 2nd argument: the callback defined in app.js to deal with errors / data.
const geocodeAddress = (add, callback) => {

    // Convert the address string into a query string that an API can read
    let query = encodeURIComponent(add)

    // REQUEST Module 
    // 1st argument: options object
        // In this case the URL copntacts the google maps API
    // 2nd argument: callback function that takes error, response, body
        // Use body to access the actual data sent back from the api
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query,
        json: true // Expect a JSON formatted response
    }, (error, response, body) => {

        if (error) {

            // We pass our callback only 1 argument. We put that argument in the first position if its an error, and in the second position if its a viable answer from the API
            callback('Unable to connect to server.', null);

        } else if (body.status === 'ZERO_RESULTS') {

            callback('Invalid address. Please try another.', null);

        } else if (body.status === 'OK') {

            console.log(`Fetching weather for ${body.results[0].formatted_address}...`)
            callback(null, body.results[0].geometry.location);

        } 

    });

}

module.exports = {
    geocodeAddress
}
