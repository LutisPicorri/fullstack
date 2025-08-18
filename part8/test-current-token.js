const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXIiLCJpZCI6IjY4YTMwMmQ5NDQxOWI2NTU0NTRhNDllZSIsImlhdCI6MTc1NTUxNTk1MX0.385wUfIjj5ar4yF5cxML_MxGm5zT8FP17ypxnnpm0Co"

console.log('Testing current token:', token.substring(0, 20) + '...')
console.log('JWT_SECRET:', JWT_SECRET)

try {
  const decoded = jwt.verify(token, JWT_SECRET)
  console.log('Token is valid!')
  console.log('Decoded payload:', decoded)
} catch (error) {
  console.log('Token verification failed:', error.message)
}
