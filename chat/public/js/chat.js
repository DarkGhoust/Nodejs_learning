const socket = io()

//Elements
const $messageButton = document.querySelector('#submit')
const $messageInput = document.querySelector('#message')
const $locationButton = document.querySelector('#location-share')
const $messages = document.querySelector('#messages')

//templates

const messagetemplate = document.querySelector('#message-template').innerHTML
const locationMessagetemplate = document.querySelector('#location-template').innerHTML

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) =>{
    const html = Mustache.render(messagetemplate, {
        createdAt: moment(message.createdAt).format('H:mm'),
        message: message.text
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) =>{
    const html = Mustache.render(locationMessagetemplate, {
        createdAt: moment(message.createdAt).format('H:mm'),
        link: message.link
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

document.querySelector('#message-form').addEventListener('submit', (e) =>{
    e.preventDefault()

    $messageButton.setAttribute('disabled', 'disabled')

    socket.emit('sendMessage', $messageInput.value, (error) =>{
        if(error){
            return console.log(error)
        }
        console.log('Delivered')
        $messageButton.removeAttribute('disabled')
        $messageInput.value = '';
        $messageInput.focus()
    })
}) 

$locationButton.addEventListener('click', () =>{
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }

    $locationButton.setAttribute('disabled', 'disabled')
    
    navigator.geolocation.getCurrentPosition( (position) =>{
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () =>{
            console.log('Location Shared')
            $locationButton.removeAttribute('disabled')
        })
    })
})

socket.emit('join', { username, room })