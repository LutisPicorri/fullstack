import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    // Get anecdotes and filter
    const { anecdotes: anecdoteList, filter } = state
    
    // Filter anecdotes by content
    const filteredAnecdotes = filter 
      ? anecdoteList.filter(anecdote => 
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdoteList
    
    // Sort anecdotes by votes in descending order (make a copy to avoid mutation)
    return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
  })

  const vote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    
    try {
      await dispatch(voteAnecdote(id)).unwrap()
      dispatch(setNotificationWithTimeout(`You voted for "${anecdote.content}"`, 5))
    } catch (error) {
      dispatch(setNotificationWithTimeout('Error voting for anecdote', 5))
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
