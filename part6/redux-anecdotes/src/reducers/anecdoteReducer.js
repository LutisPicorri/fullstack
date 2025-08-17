import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as anecdoteService from '../services/anecdotes'

const initialState = []

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/initialize',
  async () => {
    const anecdotes = await anecdoteService.getAll()
    return anecdotes
  }
)

export const createAnecdote = createAsyncThunk(
  'anecdotes/create',
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content)
    return newAnecdote
  }
)

export const voteAnecdote = createAsyncThunk(
  'anecdotes/vote',
  async (id) => {
    // First get the current anecdote to know its current votes
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    
    if (anecdoteToVote) {
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const response = await anecdoteService.update(id, updatedAnecdote)
      return response
    }
    throw new Error('Anecdote not found')
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        const updatedAnecdote = action.payload
        const index = state.findIndex(a => a.id === updatedAnecdote.id)
        if (index !== -1) {
          state[index] = updatedAnecdote
        }
      })
  }
})

export default anecdoteSlice.reducer
