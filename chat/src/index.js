const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const publicPATH = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use( express.static(publicPATH) )

let count = 0

io.on('connection', (socket) =>{
    console.log("New websocket connection")

    socket.emit('message', 'Welcome on board')

    socket.on('sendMessage', (value) =>{
        io.emit('message', value)
    })
})

server.listen(port, () => {
    console.log('Started on port: ' + port)
})