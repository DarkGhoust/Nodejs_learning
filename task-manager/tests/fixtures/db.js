const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const testUserId = new mongoose.Types.ObjectId()

const testUser = {
    _id: testUserId,
    name: 'Mike',
    email: 'mike@rhp.pt',
    password: 'P3ases2222io!',
    tokens: [{
        token: jwt.sign({ _id: testUserId }, process.env.JWT_TOKEN_SECRET)
    }]
}

const test2UserId = new mongoose.Types.ObjectId()

const test2User = {
    _id: test2UserId,
    name: 'Andrew',
    email: 'andrew@rhp.pt',
    password: 'P3ases2222io!',
    tokens: [{
        token: jwt.sign({ _id: test2UserId }, process.env.JWT_TOKEN_SECRET)
    }]
}


const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: testUserId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: test2UserId
}


const setupDB = async () =>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(testUser).save()
    await new User(test2User).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
}

module.exports = {
    testUserId, 
    testUser,
    setupDB,
    test2User,
    taskOne
}