console.log('Loading .env file...')
require('dotenv').config()
console.log('Environment variables loaded')

console.log('process.env.JWT_SECRET:', process.env.JWT_SECRET)
console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI ? 'exists' : 'missing')

const { JWT_SECRET } = require('./config')
console.log('JWT_SECRET from config:', JWT_SECRET)
console.log('JWT_SECRET length:', JWT_SECRET.length)
console.log('JWT_SECRET first 10 chars:', JWT_SECRET.substring(0, 10))
