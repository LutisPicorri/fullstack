require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}
