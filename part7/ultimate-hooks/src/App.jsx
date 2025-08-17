import React from 'react'
import { useField } from './hooks/useField'
import { useResource } from './hooks/useResource'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.reset()
    number.reset()
  }

  return (
    <div className="container">
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.inputProps} />
        <button type="submit">create</button>
      </form>
      {notes.map(n => <p key={n.id} className="item">{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div className="form-group">
          <label>name:</label>
          <input {...name.inputProps} />
        </div>
        <div className="form-group">
          <label>number:</label>
          <input {...number.inputProps} />
        </div>
        <button type="submit">create</button>
      </form>
      {persons.map(n => <p key={n.id} className="item">{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
