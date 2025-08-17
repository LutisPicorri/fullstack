import { describe, it, expect } from 'vitest'
import anecdoteReducer, { voteAnecdote, initializeAnecdotes, createAnecdote } from './anecdoteReducer'

describe('anecdote reducer', () => {
  it('should return initial state', () => {
    const state = anecdoteReducer(undefined, { type: 'INIT' })
    expect(state).toEqual([])
  })

  it('should handle initializeAnecdotes.fulfilled', () => {
    const initialState = []
    const anecdotes = [
      { id: '1', content: 'test anecdote', votes: 0 },
      { id: '2', content: 'another anecdote', votes: 5 }
    ]
    const action = { type: initializeAnecdotes.fulfilled.type, payload: anecdotes }
    const newState = anecdoteReducer(initialState, action)
    
    expect(newState).toEqual(anecdotes)
  })

  it('should handle createAnecdote.fulfilled', () => {
    const initialState = []
    const newAnecdote = { id: '1', content: 'new anecdote', votes: 0 }
    const action = { type: createAnecdote.fulfilled.type, payload: newAnecdote }
    const newState = anecdoteReducer(initialState, action)
    
    expect(newState).toHaveLength(1)
    expect(newState[0]).toEqual(newAnecdote)
  })

  it('should handle voteAnecdote.fulfilled', () => {
    const initialState = [
      { id: '1', content: 'test anecdote', votes: 0 }
    ]
    const updatedAnecdote = { id: '1', content: 'test anecdote', votes: 1 }
    const action = { type: voteAnecdote.fulfilled.type, payload: updatedAnecdote }
    const newState = anecdoteReducer(initialState, action)
    
    expect(newState[0].votes).toBe(1)
  })

  it('should not modify state for unknown action', () => {
    const initialState = [{ id: '1', content: 'test', votes: 0 }]
    const action = { type: 'UNKNOWN' }
    const newState = anecdoteReducer(initialState, action)
    
    expect(newState).toEqual(initialState)
  })
})
