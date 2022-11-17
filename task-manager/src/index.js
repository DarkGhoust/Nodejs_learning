const express = require('express')
require('./db/mongoose.js')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () =>{
    console.log('Server start on port: ', port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () =>{
    const user = await User.findById('63766efe15b180aad02fd183') 
    await user.populate('tasks')
    console.log(user.tasks)
}

main()