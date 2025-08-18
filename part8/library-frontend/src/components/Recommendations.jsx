import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

function Recommendations() {
  const { data: meData } = useQuery(ME)
  const favoriteGenre = meData?.me?.favoriteGenre || null
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre
  })

  useEffect(() => {
    if (favoriteGenre) refetch({ genre: favoriteGenre })
  }, [favoriteGenre, refetch])

  if (!favoriteGenre) {
    return (
      <div className="card">
        <h2>🎯 Recommendations</h2>
        <p>Login to see recommendations based on your favorite genre.</p>
      </div>
    )
  }

  if (loading) return <div className="loading">Loading recommendations...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div>
      <div className="card">
        <h2>🎯 Recommendations — {favoriteGenre}</h2>
        <p>Books in your favorite genre.</p>
      </div>

      {data?.allBooks?.map(book => (
        <div key={book.id} className="book-item">
          <div className="book-title">{book.title}</div>
          <div className="book-author">by {book.author?.name}</div>
          <div className="book-published">Published: {book.published}</div>
        </div>
      ))}
    </div>
  )
}

export default Recommendations
