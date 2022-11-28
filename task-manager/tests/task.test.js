const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { testUserId, testUser, setupDB } = require('./fixtures/db')

beforeEach(setupDB)

test('Should create task for user', async () =>{
    const  res = await request(app).post('/tasks')
        .set('Authorization', 'Bearer ' + testUser.tokens[0].token)
        .send({
            description: "Test"
        })
        .expect(201)

    const task = await Task.findById(res.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})