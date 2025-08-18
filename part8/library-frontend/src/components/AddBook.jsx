import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ME } from '../queries'

function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')
  const [message, setMessage] = useState('')

  // Test current user query
  const { data: meData, loading: meLoading } = useQuery(ME)

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS, variables: { genre: null } },
      { query: ALL_AUTHORS },
    ],
    onCompleted: () => {
      setMessage('Book added successfully!')
      setTitle('')
      setAuthor('')
      setPublished('')
      setGenres('')
      setTimeout(() => setMessage(''), 3000)
    },
    onError: (error) => {
      console.log('AddBook error:', error.message)
      console.log('Token in localStorage:', localStorage.getItem('library-user-token'))
      setMessage(`Error: ${error.message}`)
      setTimeout(() => setMessage(''), 5000)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Debug: Check authentication
    const token = localStorage.getItem('library-user-token')
    console.log('Submitting with token:', token ? 'exists' : 'missing')
    
    if (!title || !author || !published || !genres) {
      setMessage('Please fill in all fields')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    const genresArray = genres.split(',').map(genre => genre.trim()).filter(Boolean)
    
    addBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres: genresArray
      }
    })
  }

  return (
    <div>
      <div className="card">
        <h2>➕ Add New Book</h2>
        <p>Add a new book to the library collection.</p>
        <p><strong>Auth status:</strong> {localStorage.getItem('library-user-token') ? 'Logged in' : 'Not logged in'}</p>
        <p><strong>Current user:</strong> {meLoading ? 'Loading...' : meData?.me?.username || 'Not authenticated'}</p>
      </div>

      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Enter book title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-input"
              placeholder="Enter author name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Published Year:</label>
            <input
              type="number"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              className="form-input"
              placeholder="Enter publication year"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Genres (comma-separated):</label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              className="form-input"
              placeholder="e.g., fiction, mystery, sci-fi"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Add Book
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBook
