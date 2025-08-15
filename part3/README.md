# Part 3 - Backend Development

This part introduces backend development with Node.js, Express, and MongoDB.

## 📚 Content Overview

Part 3 focuses on building a complete backend API for the phonebook application:

- **Node.js and Express**: Server setup and routing
- **MongoDB**: Database integration with Mongoose
- **REST API**: Full CRUD operations
- **Error Handling**: Proper error management
- **Validation**: Data validation and sanitization

## 🗂️ Project Structure

```
part3/
├── models/              # Mongoose models
│   └── person.js        # Person model schema
├── mongo.js             # MongoDB connection
├── index.js             # Main server file
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running
- npm or yarn

### Installation

```bash
cd part3
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/phonebook
PORT=3001
```

### Start the Server

```bash
npm start
```

The server will run on `http://localhost:3001`

## 🎯 Learning Objectives

By completing Part 3, you will learn:

- **Backend Fundamentals**
  - Node.js server setup
  - Express.js framework
  - RESTful API design
  - HTTP methods and status codes

- **Database Integration**
  - MongoDB setup and connection
  - Mongoose ODM
  - Schema design and validation
  - CRUD operations

- **Error Handling**
  - Try-catch blocks
  - Error middleware
  - Proper HTTP status codes
  - Error logging

- **API Development**
  - Route organization
  - Middleware usage
  - Request/response handling
  - Data validation

## 📋 Key Concepts

### Express Server Setup

```javascript
const express = require('express')
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

### MongoDB Connection

```javascript
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))
```

### Mongoose Model

```javascript
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d+/.test(v)
      }
    }
  }
})
```

### REST API Routes

```javascript
// GET all persons
app.get('/api/persons', async (req, res) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

// POST new person
app.post('/api/persons', async (req, res) => {
  try {
    const person = new Person(req.body)
    const savedPerson = await person.save()
    res.status(201).json(savedPerson)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
```

## 🔧 Development Tools

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **dotenv**: Environment variable management
- **nodemon**: Development server with auto-restart

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
```

## 🗄️ Database Setup

### MongoDB Installation

1. **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
2. **macOS**: `brew install mongodb-community`
3. **Linux**: `sudo apt install mongodb`

### Start MongoDB

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### MongoDB Compass (GUI)

Download MongoDB Compass for a visual database interface.

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/persons` | Get all persons |
| GET | `/api/persons/:id` | Get person by ID |
| POST | `/api/persons` | Create new person |
| PUT | `/api/persons/:id` | Update person |
| DELETE | `/api/persons/:id` | Delete person |
| GET | `/info` | Server information |

## 🔍 Testing the API

### Using curl

```bash
# Get all persons
curl http://localhost:3001/api/persons

# Create new person
curl -X POST http://localhost:3001/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","number":"123-456789"}'

# Delete person
curl -X DELETE http://localhost:3001/api/persons/[id]
```

### Using Postman

Import the API endpoints into Postman for easier testing.

## 🐛 Debugging Tips

- Check MongoDB connection status
- Monitor server logs for errors
- Use console.log() for debugging
- Verify request/response data
- Check environment variables
- Monitor database operations

## 🔒 Security Considerations

- Validate all input data
- Sanitize user inputs
- Use environment variables for sensitive data
- Implement proper error handling
- Add request rate limiting
- Use HTTPS in production

## 📖 Next Steps

After completing Part 3, proceed to:

- [Part 4 - Testing and Authentication](../part4/README.md)

## 💡 Best Practices

- Use async/await for database operations
- Implement proper error handling
- Validate data with Mongoose schemas
- Use environment variables for configuration
- Structure code with proper separation of concerns
- Add comprehensive logging
- Write meaningful error messages

## 🚨 Common Issues

- **MongoDB connection**: Ensure MongoDB is running
- **CORS errors**: Configure CORS middleware if needed
- **Validation errors**: Check Mongoose schema validation
- **Port conflicts**: Use different ports for frontend/backend
- **Environment variables**: Ensure .env file is properly configured

---

**Backend development mastered! Ready for testing and authentication! 🚀**

