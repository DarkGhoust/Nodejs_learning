const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { testUserId, testUser, setupDB, test2User, taskOne } = require('./fixtures/db')

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

test('Should get tasks of user', async () =>{
    const  res = await request(app).get('/tasks')
        .set('Authorization', 'Bearer ' + testUser.tokens[0].token)
        .send()
        .expect(200)

    expect(res.body.length).toBe(1)
})

test('Should NOT delete task of user beacause of anauthorized', async () =>{
    await request(app).delete('/tasks/' + taskOne._id)
        .set('Authorization', 'Bearer ' + test2User.tokens[0].token)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})