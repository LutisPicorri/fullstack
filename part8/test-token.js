const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXIiLCJpZCI6IjY4YTMwMmQ5NDQxOWI2NTU0NTRhNDllZSIsImlhdCI6MTc1NTUxMzU5NH0.5vfXh6MKtmUapNfUDY0bH53dr26i5qJoGv42MT3PLHA"

console.log('Testing token:', token.substring(0, 20) + '...')
console.log('JWT_SECRET:', JWT_SECRET)

try {
  const decoded = jwt.verify(token, JWT_SECRET)
  console.log('Token is valid!')
  console.log('Decoded payload:', decoded)
} catch (error) {
  console.log('Token verification failed:', error.message)
}
