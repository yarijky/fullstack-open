import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };

    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []);

  const [newPerson, setNewPerson] = useState({ name: "", number: "", id: "" });
  const [filter, setFilter] = useState("");

  const handleOnClick = () => {
    event.preventDefault();
    if (
      persons.find(
        (person) =>
          person === newPerson.name && person.number === newPerson.number
      )
    ) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      const newPersonas = persons.concat(newPerson);
      setPersons(newPersonas);
      setNewPerson({ name: "", number: "", id: "" });
    }
  };

  const handleNameChange = (event) => {
    setNewPerson({
      ...newPerson,
      name: event.target.value,
      id: persons.length,
    });
  };

  const handleNumberChange = (event) => {
    setNewPerson({
      ...newPerson,
      number: event.target.value,
      id: persons.length,
    });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const dataFiltred = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newPerson.name}
        number={newPerson.number}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
        onClick={handleOnClick}
      />
      <h3>Numbers</h3>
      <Persons data={dataFiltred} />
    </div>
  );
};

export default App;