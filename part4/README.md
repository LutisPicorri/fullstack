# Part 4 - Testing and Authentication

This part focuses on testing strategies, user administration, and authentication in the blog list application.

## 📚 Content Overview

Part 4 covers advanced backend concepts with a blog list application:

- **Testing**: Unit testing with Jest, integration testing
- **User Administration**: User registration and management
- **Authentication**: JWT tokens and password hashing
- **Authorization**: Role-based access control
- **Blog Management**: Full CRUD operations with user ownership

## 🗂️ Project Structure

```
part4/
├── controllers/         # Route controllers
│   ├── blogs.js        # Blog operations
│   ├── login.js        # Authentication
│   └── users.js        # User management
├── middleware/          # Custom middleware
│   └── auth.js         # JWT authentication
├── models/             # Mongoose models
│   ├── blog.js         # Blog schema
│   └── user.js         # User schema
├── routes/             # API routes
│   ├── blogs.js        # Blog routes
│   ├── login.js        # Auth routes
│   ├── testing.js      # Testing routes
│   └── users.js        # User routes
├── tests/              # Test files
│   ├── blog_api.test.js
│   ├── login_api.test.js
│   ├── user_api.test.js
│   └── test_helper.js
├── utils/              # Utility functions
│   ├── config.js       # Configuration
│   └── list_helper.js  # Helper functions
├── index.js            # Main server file
└── test-bloglist.http  # HTTP test requests
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running
- npm or yarn

### Installation

```bash
cd part4
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/bloglist
JWT_SECRET=your-secret-key-here
PORT=3003
```

### Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3003`

## 🎯 Learning Objectives

By completing Part 4, you will learn:

- **Testing Strategies**
  - Unit testing with Jest
  - Integration testing
  - Test-driven development (TDD)
  - Mocking and stubbing

- **User Management**
  - User registration and validation
  - Password hashing with bcrypt
  - User authentication
  - Role-based permissions

- **Authentication & Authorization**
  - JWT token implementation
  - Password security
  - Protected routes
  - User sessions

- **Advanced Backend Features**
  - Middleware implementation
  - Error handling
  - Data validation
  - API security

## 📋 Key Concepts

### User Model with Password Hashing

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})
```

### JWT Authentication Middleware

```javascript
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
    request.user = await User.findById(decodedToken.id)
  }
  next()
}
```

### Blog Model with User Reference

```javascript
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
```

### Testing with Jest

```javascript
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})
```

## 🔧 Development Tools

- **Jest**: Testing framework
- **Supertest**: HTTP testing
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT implementation
- **mongoose-unique-validator**: Unique field validation
- **nodemon**: Development server

## 📖 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/blog_api.test.js

# Run tests in watch mode
npm run test:watch
```

### Test Structure

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and database operations
- **Helper Tests**: Test utility functions

### Test Database

Tests use a separate test database to avoid affecting development data.

## 📊 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/users` - User registration

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog (authenticated)

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Testing
- `POST /api/testing/reset` - Reset test database

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Tokens**: Stateless authentication
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error management
- **Protected Routes**: Authentication middleware

## 🐛 Debugging Tips

- Check JWT token validity
- Verify password hashing
- Monitor test database operations
- Check authentication middleware
- Verify user permissions
- Monitor API responses

## 📖 Next Steps

After completing Part 4, proceed to:

- [Part 5 - End-to-End Testing](../part5/README.md)

## 💡 Best Practices

- Always hash passwords before storing
- Use environment variables for secrets
- Implement proper error handling
- Write comprehensive tests
- Validate all user inputs
- Use meaningful HTTP status codes
- Implement proper logging

## 🚨 Common Issues

- **JWT token expiration**: Handle token refresh
- **Password validation**: Implement strong password requirements
- **Database connections**: Handle connection errors
- **Test isolation**: Ensure tests don't interfere with each other
- **Authentication flow**: Proper login/logout handling

## 🔍 Testing with HTTP Client

Use the `test-bloglist.http` file with VS Code REST Client extension or similar tools to test the API manually.

---

**Testing and authentication mastered! Ready for end-to-end testing! 🚀**
