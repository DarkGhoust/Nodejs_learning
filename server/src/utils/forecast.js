const request = require('request')

const forecast = ( {lat, long}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d44941136ffbc3b7279f9599a8d838cf&query=${lat}, ${long}`;

    request({ url, json: true }, (err, { body }) => {
        if (err){
            callback("Unable to connect", undefined)
        }  
        else if (body.error) {
            callback(body.error.info, undefined)
        }  
        else{
            callback(undefined, `Temperature:  ${body.current.temperature}. Chance of rain is ${body.current.precip}%`) 
        }
    })
}

module.exports = forecast