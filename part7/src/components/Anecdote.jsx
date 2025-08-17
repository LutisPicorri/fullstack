import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdote, vote }) => {
  const { id } = useParams()
  const anecdoteData = anecdote(Number(id))

  if (!anecdoteData) {
    return <div>Anecdote not found</div>
  }

  return (
    <div className="anecdote">
      <h3>{anecdoteData.content}</h3>
      <p>has {anecdoteData.votes} votes</p>
      <button onClick={() => vote(anecdoteData.id)}>vote</button>
      <p>for more info see <a href={anecdoteData.info}>{anecdoteData.info}</a></p>
    </div>
  )
}

export default Anecdote
