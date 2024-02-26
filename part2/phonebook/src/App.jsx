import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [[message, type], setMessage] = useState([]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage([]);
      }, 7000);
    }
  }, [message]);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const onAdd = () => {
    event.preventDefault();
    const putPerson = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase());
    if (putPerson) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(putPerson.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== putPerson.id ? person : response.data
              )
            );
            setMessage([
              `Number of ${newPerson.name} changed correctly`,
              "correct",
            ]);
          })
          .catch(() => {
            setMessage([
              `Information of ${newPerson.name} has already been removed from the server`,
              "error",
            ]);
          });
      }
    } else {
      personsService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setMessage([`Added ${newPerson.name}`, "correct"]);
        setNewPerson({ name: "", number: "" });
      });
    }
  };

  const onName = (event) => {
    setNewPerson({
      ...newPerson,
      name: event.target.value,
    });
  };

  const onNumber = (event) => {
    setNewPerson({
      ...newPerson,
      number: event.target.value,
    });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.deletePerson(person.id).then(() => {
        setPersons(
          persons.filter((prs) => {
            if (prs.id !== person.id) {
              return person;
            }
          })
        );
        setMessage([`${person.name} has been deleted correctly`, "correct"]);
      });
    }
  };

  const dataFiltred = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newPerson.name}
        number={newPerson.number}
        onChangeName={onName}
        onChangeNumber={onNumber}
        onClick={onAdd}
      />
      <h3>Numbers</h3>
      <Persons data={dataFiltred} onDelete={onDelete} />
    </div>
  );
};

export default App;
