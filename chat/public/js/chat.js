const socket = io()

socket.on('message', (res) =>{
    console.log(res)
})

document.querySelector('#submit').addEventListener('click', () =>{
    socket.emit('sendMessage', document.querySelector('#message').value)
}) 
