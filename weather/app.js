const request = require('request')

// const url = "http://api.weatherstack.com/current?access_key=d44941136ffbc3b7279f9599a8d838cf&query="

// request({ url: url, json: true }, (err, response) => {
//     if (err){
//         console.log("Unable to connect")
//     }  
//     else if (response.body.error) {
//         console.log(response.body.error.info)
//     }  
//     else{
//         console.log(`There is ${response.body.current.temperature} and chance of rain is ${response.body.current.precip}`)
//     }

// })



//Geocoding

const geourl = "http://api.positionstack.com/v1/forward?access_key=d0091b22f23d673cfc9916d99047fbcc&query=4324324"

request({ url: geourl, json: true }, (err, response) => {
    if (err){
        console.log("Unable to connect")
    }  
    else if (response.body.data.length < 1) {
        console.log('Cannot find location')
    }  
    else{
        console.log(response.body.data[0].latitude)
        console.log(response.body.data[0].longitude)
    }
    
})
