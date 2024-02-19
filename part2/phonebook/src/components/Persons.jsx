const Persons = ({ data }) => {
  {
    return data.map((person) => {
      return (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      );
    });
  }
};

export default Persons;
