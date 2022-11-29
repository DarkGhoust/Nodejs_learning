const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const publicPATH = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use( express.static(publicPATH) )

io.on('connection', (socket) =>{
    console.log("New websocket connection")

    socket.on('join', ({ username, room }) =>{
        socket.join(room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`))
    })

    socket.on('sendMessage', (value, callback) =>{
        const filter = new Filter()

        if(filter.isProfane(value)){
            return callback('Bad word not allowed')
        }

        io.emit('message', generateMessage(value))
        callback()
    })

    socket.on('sendLocation', (value, callback) =>{
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${value.latitude},${value.longitude}`))
        callback()
    })

    socket.on('disconnect', () =>{
        io.emit('message', generateMessage('User has been disconnected'))
    })
})

server.listen(port, () => {
    console.log('Started on port: ' + port)
})