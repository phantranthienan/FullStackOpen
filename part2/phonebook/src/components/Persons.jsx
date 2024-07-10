import React from "react";

const Person = ({ person, handleDeletePerson }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={handleDeletePerson}>delete</button>
    </div>
  );
};

const Persons = ({ persons, filterName, handleDeletePerson }) => {
  return (
    persons
        .filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))
        .map((person) => <Person key={person.id} person={person} handleDeletePerson={() => handleDeletePerson(person.id)}/>)
    );
};

export default Persons;
