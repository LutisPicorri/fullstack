const { test, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const { User } = require('../models/user')
const { connect } = require('./test_helper')
const app = require('../index')

const api = supertest(app)

describe('user api', () => {
  test('users are returned as json', async () => {
    await connect()
    await User.deleteMany({})
    
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    await connect()
    await User.deleteMany({})
    
    const initialUsers = await User.find({})
    assert.strictEqual(initialUsers.length, 0)

    const newUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await newUser.save()

    const response = await api.get('/api/users')
    const users = response.body

    assert.strictEqual(users.length, 1)
  })

  test('user has id property instead of _id', async () => {
    await connect()
    await User.deleteMany({})
    
    const newUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await newUser.save()

    const response = await api.get('/api/users')
    const users = response.body

    assert.strictEqual(users.length, 1)
    assert(users[0].id)
    assert.strictEqual(users[0]._id, undefined)
    assert.strictEqual(users[0].passwordHash, undefined) // Password hash should not be returned
  })

  test('a new user can be created', async () => {
    await connect()
    await User.deleteMany({})
    
    const initialUsers = await User.find({})
    assert.strictEqual(initialUsers.length, 0)

    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await User.find({})
    assert.strictEqual(finalUsers.length, 1)
    
    const savedUser = finalUsers[0]
    assert.strictEqual(savedUser.username, newUser.username)
    assert.strictEqual(savedUser.name, newUser.name)
    assert(savedUser.passwordHash) // Password should be hashed
    assert.notStrictEqual(savedUser.passwordHash, newUser.password) // Hash should not equal plain password
  })

  test('user without username returns 400', async () => {
    await connect()
    await User.deleteMany({})
    
    const newUser = {
      name: 'Test User',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user without name returns 400', async () => {
    await connect()
    await User.deleteMany({})
    
    const newUser = {
      username: 'testuser',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user without password returns 400', async () => {
    await connect()
    await User.deleteMany({})
    
    const newUser = {
      username: 'testuser',
      name: 'Test User'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user with short password returns 400', async () => {
    await connect()
    await User.deleteMany({})
    
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user with short username returns 400', async () => {
    await connect()
    await User.deleteMany({})
    
    const newUser = {
      username: 'ab',
      name: 'Test User',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('duplicate username returns 400', async () => {
    await connect()
    await User.deleteMany({})
    
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    }

    // Create first user
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    // Try to create second user with same username
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})
