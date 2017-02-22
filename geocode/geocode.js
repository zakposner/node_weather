const request = require('request');

const geocodeAddress = (add, callback) => {

    let query = encodeURIComponent(add)

    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query,
        json: true
    }, (error, response, body) => {

        if (error) {

            callback('Unable to connect to server.', null);

        } else if (body.status === 'ZERO_RESULTS') {

            callback('Invalid address. Please try another.', null);

        } else if (body.status === 'OK') {

           callback(null, body.results[0].geometry.location);

        } 

    });

}

module.exports = {
    geocodeAddress
}
