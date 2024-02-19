import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "1234567890", id: 0 },
    { name: "Yari Locos", number: "3333333333", id: 1 },
  ]);
  const [newPerson, setNewPerson] = useState({name: "", number: "", id: ""});
  const [filter, setFilter] = useState("");

  const handleOnClick = () => {
    event.preventDefault();
    if (
      persons.find(
        (person) => person === newPerson.name && person.number === newPerson.number
      )
    ) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      const newPersonas = persons.concat(newPerson);
      setPersons(newPersonas);
      setNewPerson({name: "", number: "", id: ""})
    }
  };

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value, id: persons.length})
  };

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value, id: persons.length})
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const dataFiltred = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm name={newPerson.name} number={newPerson.number} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} onClick={handleOnClick}/>
      <h3>Numbers</h3>
      <Persons data={dataFiltred}/>
    </div>
  );
};

export default App;
