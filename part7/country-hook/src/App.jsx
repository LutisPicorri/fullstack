import React, { useState } from 'react'
import { useCountry } from './hooks/useCountry'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  return (
    <div className="country-info">
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>population: {country.population}</p>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const [country, found] = useCountry(name)

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div className="container">
      <h1>Country Hook</h1>
      <div className="form-group">
        <label>find country:</label>
        <input value={name} onChange={handleChange} />
      </div>
      
      {name && !found && (
        <div className="not-found">
          not found...
        </div>
      )}
      
      {found && <Country country={country} />}
    </div>
  )
}

export default App
