const path = require('path')
const express = require('express')
const hbs = require('hbs')

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


// app.com

app.get('/weather', (req, res) =>{
    res.send('Weather page')
})

app.listen(3000, () => {
    console.log('started')
})