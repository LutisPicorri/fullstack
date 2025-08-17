import React from 'react'
import { useAnecdotes, useVoteAnecdote } from '../hooks/useAnecdotes'

const AnecdoteList = () => {
  const { data: anecdotes, isLoading, error } = useAnecdotes()
  const voteAnecdoteMutation = useVoteAnecdote()

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    voteAnecdoteMutation.mutate({ id: anecdote.id, anecdote: updatedAnecdote })
  }

  if (isLoading) {
    return <div className="loading">Loading anecdotes...</div>
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>anecdote service not available due to problems in server on localhost</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id} className="anecdote">
          <div className="anecdote-content">
            {anecdote.content}
          </div>
          <div className="anecdote-votes">
            <span>has {anecdote.votes} votes</span>
            <button 
              onClick={() => handleVote(anecdote)}
              disabled={voteAnecdoteMutation.isPending}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
