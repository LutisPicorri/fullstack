import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationContextProvider } from './contexts/NotificationContext'

const App = () => {
  return (
    <NotificationContextProvider>
      <div className="container">
        <h1>Anecdote app</h1>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </NotificationContextProvider>
  )
}

export default App
