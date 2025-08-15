const { test, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const { User } = require('../models/user')
const { connect } = require('./test_helper')
const app = require('../index')
const bcrypt = require('bcryptjs')

const api = supertest(app)

describe('login api', () => {
  test('login with valid credentials returns token', async () => {
    await connect()
    await User.deleteMany({})
    
    // Create a test user with hashed password
    const passwordHash = await bcrypt.hash('password123', 10)
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash
    })
    await testUser.save()
    
    const loginData = {
      username: 'testuser',
      password: 'password123'
    }

    const response = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responseBody = response.body
    assert(responseBody.token)
    assert.strictEqual(responseBody.username, testUser.username)
    assert.strictEqual(responseBody.name, testUser.name)
  })

  test('login with invalid username returns 401', async () => {
    await connect()
    await User.deleteMany({})
    
    const loginData = {
      username: 'nonexistent',
      password: 'password123'
    }

    await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('login with invalid password returns 401', async () => {
    await connect()
    await User.deleteMany({})
    
    // Create a test user with hashed password
    const passwordHash = await bcrypt.hash('password123', 10)
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash
    })
    await testUser.save()
    
    const loginData = {
      username: 'testuser',
      password: 'wrongpassword'
    }

    await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})
