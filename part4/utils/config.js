const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connect = async () => {
  const url = process.env.MONGODB_URI
  if (!url) {
    throw new Error('MONGODB_URI is not set')
  }
  if (mongoose.connection.readyState === 1) return
  await mongoose.connect(url)
}

module.exports = { connect }
