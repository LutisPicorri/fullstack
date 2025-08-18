import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

function Authors() {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (loading) return <div className="loading">Loading authors...</div>
  if (error) return <div className="error">Error loading authors: {error.message}</div>

  return (
    <div>
      <div className="card">
        <h2>📖 All Authors</h2>
        <p>Browse through all authors in our library collection.</p>
      </div>

      {data.allAuthors.map(author => (
        <div key={author.name} className="author-item">
          <div className="author-name">{author.name}</div>
          <div className="author-born">{author.born ? `Born: ${author.born}` : 'Birth year not set'}</div>
          <div className="author-book-count">Books written: {author.bookCount}</div>
        </div>
      ))}
    </div>
  )
}

export default Authors
