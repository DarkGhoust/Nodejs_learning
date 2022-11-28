const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { testUserId, testUser, setupDB } = require('./fixtures/db')

beforeEach(setupDB)

test ('Should sign up a new user', async () =>{
    const res = await request(app).post('/users')
        .send({
            name: 'Andrew',
            email: 'andriid.oleniuk@rhp.pt',
            password: 'P3ases2222io!'
        }).expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(res.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the responce
    expect(res.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andriid.oleniuk@rhp.pt',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('P3ases2222io!')
})

test ('Should Login a user', async () =>{
    const res = await request(app).post('/users/login')
        .send(testUser)
        .expect(200)

    const user = await User.findById(testUserId)
    expect(res.body.token).toBe(user.tokens[1].token)
})

test ('Should NOT Login a user', async () =>{
    await request(app).post('/users/login')
        .send({
            email: '213.21321@k3.2',
            password: '22222'
        }).expect(400)
})

test ('Should get profile for user', async () =>{
    await request(app).get('/users/me')
        .set('Authorization', 'Bearer ' + testUser.tokens[0].token)
        .send()
        .expect(200)
})

test ('Should NOT get profile for user', async () =>{
    await request(app).get('/users/me')
        .set('Authorization', `Bearer 23123123213123`)
        .send()
        .expect(401)
})

test ('Should DELETE user profile', async () =>{
    const res = await request(app).delete('/users/me')
        .set('Authorization', 'Bearer ' + testUser.tokens[0].token)
        .send()
        .expect(200)

    const user = await User.findById(testUserId)
    expect(user).toBeNull()
})

test ('Should NOT DELETE user profile', async () =>{
    await request(app).delete('/users/me')
        .set('Authorization', 'Bearer ')
        .send()
        .expect(401)
})

test ('Should Create avatar image', async () =>{
    await request(app).post('/users/me/avatar')
        .set('Authorization', 'Bearer ' + testUser.tokens[0].token)
        .attach('avatar', 'tests/fixtures/pic.png')
        .expect(200)

    const user = await User.findById(testUserId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})