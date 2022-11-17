require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('637395e721b7eee9cbfeae0e', { age: 0}).then((user) =>{
//     console.log(user)
//     return User.countDocuments({age: 20})
// }).then((users) =>{
//     console.log(users)
// }).catch((e) =>{
//     console.log(e)
// })

const update = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

update('637395e721b7eee9cbfeae0e', '22').then((count) =>{
    console.log(count )
}).catch((e) =>{
    console.log(e)
})

const Task = require('../src/models/task')

// Task.findByIdAndDelete('637501104580a83799fba88e').then((task) =>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((tasks) =>{
//     console.log(tasks)
// }).catch((e) =>{
//     console.log(e)
// })

const deleteTask = async (id, completed) =>{
    const user = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })

    return count
}

deleteTask('6373a5afcbbb1bbe68717ee7', true).then((count) =>{
    console.log(count )
}).catch((e) =>{
    console.log(e)
})