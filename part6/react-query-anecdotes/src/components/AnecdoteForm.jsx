import React, { useState } from 'react'
import { useCreateAnecdote } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const createAnecdoteMutation = useCreateAnecdote()

  const handleSubmit = (e) => {
    e.preventDefault()
    createAnecdoteMutation.mutate(content)
    setContent('')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter anecdote content"
          />
        </div>
        <button 
          type="submit" 
          disabled={createAnecdoteMutation.isPending}
        >
          {createAnecdoteMutation.isPending ? 'Creating...' : 'create'}
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
