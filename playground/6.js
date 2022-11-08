const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=d44941136ffbc3b7279f9599a8d838cf&query=50,30';

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) =>{
        data = data + chunk.toString()
    })

    response.on('end', () =>{
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (err) =>{
    console.log(err)
})

request.end()