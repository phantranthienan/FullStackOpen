import React from 'react'

const PersonForm = ({
    newName,
    newNumber,
    handleNameInput,
    handleNumberInput,
    handleAddPerson,
  }) => {
    return (
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };

export default PersonForm