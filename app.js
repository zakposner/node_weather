const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {
            describe: 'Address used to fetch weather conditions.',
            demand: true,
            alias: 'a',
            string: true // tells yargs to always parse the option value as a string
        }
    })
    .help() // init a help command for the app
    .alias('help', 'h') // sets alias for the help command
    .argv; // return formated argument hash to argv

let coords, forecast;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) console.log(errorMessage);
    if (results) {
        weather.setWeather(results, weather.printWeather);
    }
});
