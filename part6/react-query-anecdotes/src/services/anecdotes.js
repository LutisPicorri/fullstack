import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const anecdoteService = {
  getAll: async () => {
    const response = await axios.get(baseURL)
    return response.data
  },

  createNew: async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseURL, object)
    return response.data
  },

  update: async (id, anecdote) => {
    const response = await axios.put(`${baseURL}/${id}`, anecdote)
    return response.data
  }
}

export default anecdoteService
