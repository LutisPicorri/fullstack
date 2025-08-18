const { ApolloServer } = require('apollo-server')
const { gql } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { GraphQLError } = require('graphql')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const { MONGODB_URI, JWT_SECRET } = require('./config')
const { getCurrentUser } = require('./utils/auth')

const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = Book.find({}).populate('author')
      
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query = query.where('author').equals(author._id)
        } else {
          return []
        }
      }
      
      if (args.genre) {
        query = query.where('genres').in([args.genre])
      }
      
      return query.exec()
    },
    allAuthors: async () => {
      // Fix n+1 problem by using aggregation pipeline
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: 'books',
            localField: '_id',
            foreignField: 'author',
            as: 'books'
          }
        },
        {
          $project: {
            name: 1,
            born: 1,
            bookCount: { $size: '$books' }
          }
        }
      ])
      
      return authors
    },
    me: async (root, args, context) => {
      const currentUser = await getCurrentUser(context)
      if (!currentUser) {
        return null
      }
      return User.findById(currentUser.id)
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = await getCurrentUser(context)
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })
        
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({
          ...args,
          author: author._id
        })

        const savedBook = await book.save()
        const populatedBook = await Book.findById(savedBook._id).populate('author')
        
        // Publish subscription
        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
        
        return populatedBook
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = await getCurrentUser(context)
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }

        author.born = args.setBornTo
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args }
        })
      }
    },
    createUser: async (root, args) => {
      try {
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })

        return user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return { req }
  },
  cors: {
    origin: '*',
    credentials: true
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      console.log('Client connected to subscriptions')
    },
    onDisconnect: () => {
      console.log('Client disconnected from subscriptions')
    }
  }
})

server.listen({ port: 4001 }).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
