const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')

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

const setupDB = async () =>{
    await User.deleteMany()
    await new User(testUser).save()
}

module.exports = {
    testUserId, 
    testUser,
    setupDB
}