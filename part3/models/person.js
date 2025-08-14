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

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = { Person, connect }


