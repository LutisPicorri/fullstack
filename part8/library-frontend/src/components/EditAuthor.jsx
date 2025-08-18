import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

function EditAuthor() {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [birthYear, setBirthYear] = useState('')
  const [message, setMessage] = useState('')

  const { loading, error, data } = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: (data) => {
      if (data.editAuthor) {
        setMessage(`Successfully updated ${data.editAuthor.name}'s birth year to ${data.editAuthor.born}`)
        setSelectedAuthor(null)
        setBirthYear('')
      } else {
        setMessage('Author not found')
      }
      setTimeout(() => setMessage(''), 5000)
    },
    onError: (error) => {
      setMessage(`Error: ${error.message}`)
      setTimeout(() => setMessage(''), 5000)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedAuthor || !birthYear) {
      setMessage('Please select an author and enter a birth year')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    editAuthor({
      variables: {
        name: selectedAuthor.value,
        setBornTo: parseInt(birthYear)
      }
    })
  }

  if (loading) return <div className="loading">Loading authors...</div>
  if (error) return <div className="error">Error loading authors: {error.message}</div>

  const authorOptions = data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  }))

  return (
    <div>
      <div className="card">
        <h2>✏️ Edit Author Birth Year</h2>
        <p>Set or update the birth year for an existing author.</p>
      </div>

      {message && (
        <div className={message.includes('Error') || message.includes('not found') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Author:</label>
            <Select
              value={selectedAuthor}
              onChange={setSelectedAuthor}
              options={authorOptions}
              placeholder="Choose an author..."
              isClearable
              className="form-select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  minHeight: '48px',
                  '&:hover': {
                    borderColor: '#667eea'
                  }
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#667eea' : state.isFocused ? '#f8f9fa' : 'white',
                  color: state.isSelected ? 'white' : '#333'
                })
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Birth Year:</label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="form-input"
              placeholder="Enter birth year"
              min="1000"
              max="2024"
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            Update Birth Year
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Current Authors</h3>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {data.allAuthors.map(author => (
            <div key={author.name} className="author-item" style={{ margin: 0 }}>
              <div className="author-name">{author.name}</div>
              <div className="author-born">
                {author.born ? `Born: ${author.born}` : 'Birth year not set'}
              </div>
              <div className="author-book-count">Books: {author.bookCount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EditAuthor
