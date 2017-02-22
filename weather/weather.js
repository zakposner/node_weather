const request = require('request');

const printWeather = (forecast) => {
        console.log(JSON.stringify(forecast, null, 2));
}

const setWeather = (coords, callback) => {

    const secretKey = 'f3f71f4e35f39a9e3cd753d58d1bfb9e';

    request({
        url: `https://api.darksky.net/forecast/${secretKey}/${coords.lat},${coords.lng}`,
        json: true 
    }, (error, response, body) => {

        // Only use callback if no errors
        if (!error && response.statusCode === 200) {
            callback({ // Data we want to transmit
                "temperature": body.currently.temperature,
                "humidity": body.currently.humidity,
                "chance of rain": body.currently.precipProbability,
                "forecast": body.daily.summary 
            });
        } else {
            console.log('Error connecting to api.')
        }

    });

}

module.exports = {
    setWeather,
    printWeather
}