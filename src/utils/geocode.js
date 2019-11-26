const request = require('request')

const geocode = (address, callback) => {
    const uri = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmFicmFyIiwiYSI6ImNrMzZ2aWN5OTA1emMzY3J4MXZhZW9kOWMifQ.Ofc3tMTnW6pI8w0-FekebA"
    request({ uri, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to location services.", undefined)
        }
        else if (body.features.length === 0) {
            callback("Unable to find a match for requested location", undefined)
        }
        else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name

            const data = {
                longitude,
                latitude,
                location,
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode   