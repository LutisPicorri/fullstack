const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config')
const Author = require('./models/Author')
const Book = require('./models/Book')

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky',
  },
  { 
    name: 'Sandi Metz',
  },
]

const books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['patterns', 'ruby']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['period']
  },
]

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Author.deleteMany({})
    await Book.deleteMany({})
    
    console.log('Cleared existing data')
    
    // Create authors
    const createdAuthors = await Author.insertMany(authors)
    console.log('Authors created:', createdAuthors.length)
    
    // Create books with author references
    const authorMap = {}
    createdAuthors.forEach(author => {
      authorMap[author.name] = author._id
    })
    
    const booksWithAuthors = books.map(book => ({
      ...book,
      author: authorMap[book.author]
    }))
    
    const createdBooks = await Book.insertMany(booksWithAuthors)
    console.log('Books created:', createdBooks.length)
    
    console.log('Database seeded successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error seeding database:', error)
    mongoose.connection.close()
  }
}

seedDatabase()
