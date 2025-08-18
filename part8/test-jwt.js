const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

console.log('JWT_SECRET being used:', JWT_SECRET)

// Test token creation
const testUser = {
  username: 'testuser',
  id: '123456789'
}

const token = jwt.sign(testUser, JWT_SECRET)
console.log('Created token:', token)

// Test token verification
try {
  const decoded = jwt.verify(token, JWT_SECRET)
  console.log('Token verified successfully:', decoded)
} catch (error) {
  console.log('Token verification failed:', error.message)
}
