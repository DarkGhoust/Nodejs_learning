const users = []

//addUser, removeUser, getUser, getUsersInRooom

const addUser = ({ id, username, room }) =>{
    //Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if(!username || !room){
        return {
            error: 'Username and rrom are required'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) =>{
        return user.room === room && username === user.username
    }) 

    //Validate username
    if(existingUser){
        return {
            error: 'This user was already used'
        }
    }

    //Store User
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) =>{
    const index = users.findIndex((user) =>{
        return user.id === id
    })

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

addUser({
    id: 22,
    username: 'Andrew   ',
    room: '1'
})

console.log(removeUser(22))

console.log(users)