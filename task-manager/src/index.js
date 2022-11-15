const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) =>{
    const user = new User(req.body)
    user.save().then(() =>{
        res.send(user)
    }).catch((error) =>{
        res.status(400).send(error)
    })
})

app.listen(port, () =>{
    console.log('Server start on port: ', port)
})