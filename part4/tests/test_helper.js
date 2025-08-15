const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
  const url = process.env.MONGODB_URI
  if (!url) {
    throw new Error('MONGODB_URI is not set')
  }
  if (mongoose.connection.readyState === 1) return
  await mongoose.connect(url)
}

const closeConnection = async () => {
  await mongoose.connection.close()
}

module.exports = { connect, closeConnection }
