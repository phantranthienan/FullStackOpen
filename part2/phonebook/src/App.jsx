import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import personsService from "./services/personsService";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personsService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    if (!nameExists) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: nanoid(3),
      };
      personsService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
          setShowMessage(true);
          setNotification({
            message: `Added ${createdPerson.name}`,
            type: "success",
          });
        })
        .catch((error) => {
          setShowMessage(true);
          setNotification({
            message: error,
            type: "error",
          });
        });
      setNewName("");
      setNewNumber("");
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const selectedPerson = persons.find(
          (person) => person.name === newName
        );
        const updatedPerson = { ...selectedPerson, number: newNumber };
        personsService
          .update(selectedPerson.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setShowMessage(true);
            setNotification({
              message: `Updated ${selectedPerson.name}`,
              type: "success",
            });
          })
          .catch((error) => {
            setShowMessage(true);
            setNotification({
              message: `Information of ${selectedPerson.name} has already been removed from server`,
              type: "error",
            });
            setPersons(persons.filter((person) => person.id !== selectedPerson.id));
          });
      }
    }
  };

  const handleDeletePerson = (id) => {
    const selectedPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${selectedPerson.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setShowMessage(true);
          setNotification({
            message: `Deleted ${selectedPerson.name}`,
            type: "success",
          });
        })
        .catch((error) => {
          setShowMessage(true);
          setNotification({
            message: `Information of ${selectedPerson.name} has already been removed from server`,
            type: "error",
          });
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {showMessage && <Notification notification={notification} />}

      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        handleAddPerson={handleAddPerson}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterName={filterName}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
