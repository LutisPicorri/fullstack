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

const phoneRegex = /^(\d{2,3})-(\d{5,})$/

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    trim: true,
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    minlength: [8, 'Number must be at least 8 characters long'],
    validate: {
      validator: (v) => phoneRegex.test(v),
      message: (props) => `${props.value} is not a valid phone number (expected NN-NNNNNN or NNN-NNNNNN)`
    }
  },
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


