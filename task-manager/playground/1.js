require('../src/db/mongoose')
// const User = require('../src/models/user')

// User.findByIdAndUpdate('637395e721b7eee9cbfeae0e', { age: 0}).then((user) =>{
//     console.log(user)
//     return User.countDocuments({age: 20})
// }).then((users) =>{
//     console.log(users)
// }).catch((e) =>{
//     console.log(e)
// })

const Task = require('../src/models/task')

Task.findByIdAndDelete('637501104580a83799fba88e').then((task) =>{
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((tasks) =>{
    console.log(tasks)
}).catch((e) =>{
    console.log(e)
})