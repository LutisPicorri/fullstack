const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        name:
        <input value={newName} onChange={handleNameChange} required />
      </label>
    </div>
    <div>
      <label>
        number:
        <input value={newNumber} onChange={handleNumberChange} required />
      </label>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm