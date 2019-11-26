const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const uri = "https://api.darksky.net/forecast/52bf2b749f1b4263fd343024c176c021/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si"
    request({ uri, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        }
        else if (body.error) {
            // callback(response.body.error, undefined)
            callback("Unable to find weather", undefined)
        }
        else {
            const msg = body.hourly.summary + ". It is currently " + body.currently.temperature + " degrees. There is a " + body.currently.precipProbability + "% chance of rain."
            callback(undefined, msg)
        }
    })
}

module.exports = forecast