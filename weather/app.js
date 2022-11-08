const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode(process.argv[2], (error, data) => {
    if (error){
        return console.log("Error ", error)
    }
    forecast(data, (error, forecastData) => {
        if (error){
            return console.log("Error ", error)
        }
        console.log(forecastData)
    })
})
