const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const users = require('./utils/users')

const publicPATH = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use( express.static(publicPATH) )

io.on('connection', (socket) =>{
    console.log("New websocket connection")

    socket.on('join', ({ username, room }, callback) =>{
        const {error, user } = users.addUser({
            id: socket.id,
            username,
            room
        })

        if(error){
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage(user.username, 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(user.username, `${user.username} has joined`))

        io.to(user.room).emit('roomData', {
            userlist: users.getUserInRoom(user.room),
            room: user.room
        })

        callback()
    })

    socket.on('sendMessage', (value, callback) =>{
        const user = users.getUser(socket.id)
        const filter = new Filter()

        if(filter.isProfane(value)){
            return callback('Bad word not allowed')
        }

        io.to(user.room).emit('message', generateMessage(user.username, value))
        callback()
    })

    socket.on('sendLocation', (value, callback) =>{
        const user = users.getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${value.latitude},${value.longitude}`))
        callback()
    })

    socket.on('disconnect', () =>{
        const user = users.removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', generateMessage(user.username, user.username + ' has been disconnected'))
            io.to(user.room).emit('roomData', {
                userlist: users.getUserInRoom(user.room),
                room: user.room
            })
        }

    })
})

server.listen(port, () => {
    console.log('Started on port: ' + port)
})