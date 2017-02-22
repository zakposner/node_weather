const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {
            describe: 'Address used to fetch weather conditions.',
            demand: true,
            alias: 'a',
            string: true 
        }
    })
    .help() 
    .alias('help', 'h') 
    .argv; // set formated argument hash to argv


geocode.geocodeAddress(argv.address, (errorMessage, coordinates) => {
    if (errorMessage) console.log(errorMessage);
    if (coordinates) {
        // Connect to weather api with coordinates
        // Callback prints weather to cli
        weather.setWeather(coordinates, weather.printWeather);
    }
});
