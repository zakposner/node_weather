const request = require('request');

const printWeather = (forecast) => {
        console.log('\n');
        console.log(`The current temperature is: ${forecast.temp}F`);
        console.log(`Weekly forecast: ${forecast.weather}`)
}

const setWeather = (coords, callback) => {

    const secretKey = 'f3f71f4e35f39a9e3cd753d58d1bfb9e';

    request({
        url: `https://api.darksky.net/forecast/${secretKey}/${coords.lat},${coords.lng}`,
        json: true 
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            callback({
                temp: body.currently.temperature,
                weather: body.daily.summary 
            });
        }

    });

}

module.exports = {
    setWeather,
    printWeather
}