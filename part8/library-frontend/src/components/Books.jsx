import { useMemo, useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED_SUBSCRIPTION } from '../queries'

function Books() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre || null },
    fetchPolicy: 'cache-and-network'
  })

  // Subscribe to new books
  const { data: subscriptionData } = useSubscription(BOOK_ADDED_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data?.data?.bookAdded) {
        const newBook = data.data.bookAdded
        // Show alert notification
        window.alert(`New book added: ${newBook.title} by ${newBook.author.name}`)
        
        // Refetch books to update the view
        refetch()
      }
    },
    onError: (error) => {
      console.error('Subscription error:', error)
    }
  })

  const genres = useMemo(() => {
    if (!data?.allBooks) return []
    const set = new Set()
    data.allBooks.forEach(b => b.genres.forEach(g => set.add(g)))
    return Array.from(set).sort()
  }, [data])

  if (loading && !data) return <div className="loading">Loading books...</div>
  if (error) return <div className="error">Error loading books: {error.message}</div>

  const books = data?.allBooks ?? []

  return (
    <div>
      <div className="card">
        <h2>📚 All Books{selectedGenre ? ` — ${selectedGenre}` : ''}</h2>
        <p>Browse through all books in our library collection.</p>
      </div>

      {books.map(book => (
        <div key={book.id || book.title} className="book-item">
          <div className="book-title">{book.title}</div>
          <div className="book-author">by {book.author?.name || 'Unknown'}</div>
          <div className="book-published">Published: {book.published}</div>
          <div className="genre-tags">
            {book.genres.map(g => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <h3>Filter by genre</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${!selectedGenre ? 'btn-secondary' : ''}`}
            onClick={() => { setSelectedGenre(null); refetch({ genre: null }) }}
          >
            All
          </button>
          {genres.map(g => (
            <button
              key={g}
              className={`btn ${selectedGenre === g ? '' : 'btn-secondary'}`}
              onClick={() => { setSelectedGenre(g); refetch({ genre: g }) }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Books
