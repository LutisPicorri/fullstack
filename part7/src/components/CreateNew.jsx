import React from 'react'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>content:</label>
          <input {...content.inputProps} />
        </div>
        <div className="form-group">
          <label>author:</label>
          <input {...author.inputProps} />
        </div>
        <div className="form-group">
          <label>url for more info:</label>
          <input {...info.inputProps} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
