# GraphQL Library Backend

A GraphQL backend for a library management system with MongoDB integration and user authentication.

## Features

- **Database Integration**: MongoDB with Mongoose ODM
- **User Authentication**: JWT-based authentication
- **GraphQL API**: Complete CRUD operations for books and authors
- **Validation**: Database-level validation with error handling
- **Authorization**: Protected mutations requiring authentication

## Setup

### Prerequisites

1. **MongoDB**: Make sure MongoDB is running locally or update the connection string
2. **Node.js**: Version 14 or higher

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. Seed the database with initial data:
```bash
npm run seed
```

4. Start the server:
```bash
npm start
```

The GraphQL playground will be available at `http://localhost:4000`

## API Features

### Queries
- `bookCount`: Get total number of books
- `authorCount`: Get total number of authors
- `allBooks(author, genre)`: Get all books with optional filtering
- `allAuthors`: Get all authors with book counts
- `me`: Get current user information (requires authentication)

### Mutations
- `addBook`: Add a new book (requires authentication)
- `editAuthor`: Update author birth year (requires authentication)
- `createUser`: Create a new user account
- `login`: Authenticate user and get JWT token

### Authentication

All users have the same hardcoded password: `secret`

## Example Usage

### Create a user:
```graphql
mutation {
  createUser(username: "john", favoriteGenre: "sci-fi") {
    username
    favoriteGenre
  }
}
```

### Login:
```graphql
mutation {
  login(username: "john", password: "secret") {
    value
  }
}
```

### Add a book (with authentication):
```graphql
mutation {
  addBook(
    title: "New Book"
    author: "John Doe"
    published: 2023
    genres: ["fiction"]
  ) {
    title
    author {
      name
    }
  }
}
```

**Note**: Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### Author
- `name`: String (required, min length 2)
- `born`: Number (optional)

### Book
- `title`: String (required, min length 2)
- `published`: Number (optional)
- `author`: Reference to Author (required)
- `genres`: Array of Strings

### User
- `username`: String (required, min length 3, unique)
- `favoriteGenre`: String (required)

## Error Handling

The API includes comprehensive error handling:
- Database validation errors are converted to GraphQL errors
- Authentication errors for protected operations
- Proper error messages for invalid input
