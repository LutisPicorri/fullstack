import { useState, useEffect } from 'react'
import personService from './personService'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const nameTrimmed = newName.trim()
    const numberTrimmed = newNumber.trim()
    if (!nameTrimmed || !numberTrimmed) return
    const existingPerson = persons.find(person => person.name.toLowerCase() === nameTrimmed.toLowerCase())
    if (existingPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const updatedPerson = { ...existingPerson, number: numberTrimmed }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => setSuccessMessage(''), 4000)
          })
          .catch((error) => {
            const msg = error?.response?.data?.error || `Information of ${existingPerson.name} has already been removed from server`
            setErrorMessage(msg)
            setTimeout(() => setErrorMessage(''), 4000)
            if (error?.response?.status === 404) {
              setPersons(persons.filter(p => p.id !== existingPerson.id))
            }
          })
      }
      return
    }
    const personObject = { name: nameTrimmed, number: numberTrimmed }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setSuccessMessage(''), 4000)
      })
      .catch((error) => {
        const msg = error?.response?.data?.error || `Failed to add ${personObject.name}`
        setErrorMessage(msg)
        setTimeout(() => setErrorMessage(''), 4000)
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${name}`)
          setTimeout(() => setSuccessMessage(''), 4000)
        })
        .catch(() => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => setErrorMessage(''), 4000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Notification message={errorMessage} type="error" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App