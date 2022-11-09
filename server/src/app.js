const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define PATH for express config
const publicPATH = path.join(__dirname, '../public')
const viewPATH = path.join(__dirname, '../template/views')
const partialsPATH = path.join(__dirname, '../template/partials')

// Setup handle bar and views location
app.set('view engine', 'hbs')
app.set('views', viewPATH)
hbs.registerPartials(partialsPATH)

// Setup static directory to serve
app.use( express.static(publicPATH) )

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Main page',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About page',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help page',
        name: 'Andrew'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        }) 
    }
    geocode(req.query.address, (error, data) => {
        if (error){
            return res.send({ error })
        }
        forecast(data, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                'address': req.query.address,
                'forecast': forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Help page',
        name: 'Andrew',
        errorMessage: 'Help page not found'
    })
})

//404 Eror
app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Help page',
        name: 'Andrew',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Started on port: 3000')
})