const request = require('request')

const geocode = (address, callback) => {
    const url = "http://api.positionstack.com/v1/forward?access_key=d0091b22f23d673cfc9916d99047fbcc&query=" + encodeURIComponent(address);

    request({ url, json: true }, (err, { body }) => {
        if (err){
            callback("Unable to connect", undefined)
        }  
        else if (body.data == undefined || body.data[0] == undefined) {
            callback("Cannot find location", undefined)
        }  
        else{
            callback(undefined, {
                lat: body.data[0].latitude, 
                long: body.data[0].longitude
            }) 
        }
    })
}

module.exports = geocode