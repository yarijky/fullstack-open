const Persons = ({ data, onDelete }) => {
  {
    return data.map((person) => {
      if (person.name) {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => onDelete(person)}>delete</button>
          </div>
        );
      }
    });
  }
};

export default Persons;