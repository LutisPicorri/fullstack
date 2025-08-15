const { test, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const { Blog } = require('../models/blog')
const { User } = require('../models/user')
const { connect, closeConnection } = require('./test_helper')
const app = require('../index')
const jwt = require('jsonwebtoken')

const api = supertest(app)

// Helper function to create a token for testing
const createToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  return jwt.sign(userForToken, process.env.SECRET || 'test-secret')
}

describe('blog api', () => {
  test('blogs are returned as json', async () => {
    await connect()
    await Blog.deleteMany({})
    
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const initialBlogs = await Blog.find({})
    assert.strictEqual(initialBlogs.length, 0)

    const newBlog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5,
      user: testUser._id
    })
    await newBlog.save()

    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert.strictEqual(blogs.length, 1)
    assert(blogs[0].user) // Should have user populated
  })

  test('blog has id property instead of _id', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const newBlog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5,
      user: testUser._id
    })
    await newBlog.save()

    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert.strictEqual(blogs.length, 1)
    assert(blogs[0].id)
    assert.strictEqual(blogs[0]._id, undefined)
  })

  test('a new blog can be created', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const token = createToken(testUser)
    
    const initialBlogs = await Blog.find({})
    assert.strictEqual(initialBlogs.length, 0)

    const newBlog = {
      title: 'New Test Blog',
      author: 'New Test Author',
      url: 'https://newtest.com',
      likes: 10
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await Blog.find({})
    assert.strictEqual(finalBlogs.length, 1)
    
    const savedBlog = finalBlogs[0]
    assert.strictEqual(savedBlog.title, newBlog.title)
    assert.strictEqual(savedBlog.author, newBlog.author)
    assert.strictEqual(savedBlog.url, newBlog.url)
    assert.strictEqual(savedBlog.likes, newBlog.likes)
    assert(savedBlog.user) // Should have user assigned
    
    // Check that the response includes populated user data
    const responseBlog = response.body
    assert(responseBlog.user)
    assert.strictEqual(responseBlog.user.username, testUser.username)
    assert.strictEqual(responseBlog.user.name, testUser.name)
  })

  test('likes defaults to 0 if missing', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const token = createToken(testUser)
    
    const newBlog = {
      title: 'Blog without likes',
      author: 'Test Author',
      url: 'https://test.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await Blog.find({})
    assert.strictEqual(finalBlogs.length, 1)
    assert.strictEqual(finalBlogs[0].likes, 0)
  })

  test('blog without title returns 400', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const token = createToken(testUser)
    
    const newBlog = {
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('blog without url returns 400', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const token = createToken(testUser)
    
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('a blog can be deleted', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const token = createToken(testUser)
    
    const newBlog = new Blog({
      title: 'Blog to delete',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5,
      user: testUser._id
    })
    const savedBlog = await newBlog.save()
    
    const initialBlogs = await Blog.find({})
    assert.strictEqual(initialBlogs.length, 1)

    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const finalBlogs = await Blog.find({})
    assert.strictEqual(finalBlogs.length, 0)
  })

  test('deleting non-existent blog returns 404', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const token = createToken(testUser)
    
    const fakeId = '507f1f77bcf86cd799439011' // Valid MongoDB ObjectId format
    
    await api
      .delete(`/api/blogs/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('a blog can be updated', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const newBlog = new Blog({
      title: 'Original Title',
      author: 'Original Author',
      url: 'https://original.com',
      likes: 5,
      user: testUser._id
    })
    const savedBlog = await newBlog.save()
    
    const updateData = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'https://updated.com',
      likes: 10
    }

    const response = await api
      .put(`/api/blogs/${savedBlog.id}`)
      .send(updateData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = response.body
    assert.strictEqual(updatedBlog.title, updateData.title)
    assert.strictEqual(updatedBlog.author, updateData.author)
    assert.strictEqual(updatedBlog.url, updateData.url)
    assert.strictEqual(updatedBlog.likes, updateData.likes)
  })

  test('updating non-existent blog returns 404', async () => {
    await connect()
    await Blog.deleteMany({})
    
    const fakeId = '507f1f77bcf86cd799439011' // Valid MongoDB ObjectId format
    const updateData = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'https://updated.com',
      likes: 10
    }

    await api
      .put(`/api/blogs/${fakeId}`)
      .send(updateData)
      .expect(404)
  })

  test('updating blog likes works correctly', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const newBlog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5,
      user: testUser._id
    })
    const savedBlog = await newBlog.save()
    
    const response = await api
      .put(`/api/blogs/${savedBlog.id}`)
      .send({ likes: 15 })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = response.body
    assert.strictEqual(updatedBlog.likes, 15)
    assert.strictEqual(updatedBlog.title, 'Test Blog') // Other fields unchanged
    assert.strictEqual(updatedBlog.author, 'Test Author')
    assert.strictEqual(updatedBlog.url, 'https://test.com')
  })

  test('blog creation fails when no users exist', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('blog creation fails without token', async () => {
    await connect()
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    // Create a test user first
    const testUser = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash: 'hashedpassword'
    })
    await testUser.save()
    
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})
