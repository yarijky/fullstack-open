import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Select from "react-select";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      born
      id
      name
      bookCount
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const Authors = () => {
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  if (authors.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((author) => (
            <Author key={author.name} author={author} />
          ))}
        </tbody>
      </table>
      <Birthday authors={authors.data.allAuthors} />
    </div>
  );
};

const Author = ({ author }) => {
  return (
    <tr key={author.name}>
      <td>{author.name}</td>
      <td>{author.born}</td>
      <td>{author.bookCount}</td>
    </tr>
  );
};

const Birthday = ({ authors }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");
  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const updateAuthor = () => {
    event.preventDefault();
    editAuthor({
      variables: { name: name.value, born: parseInt(born) },
    });

    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.log("person not found");
    }
  }, [result.data]);

  return (
    <div>
      <h3>Set birthyear</h3>
      <form>
        <div>
          <Select
            defaultValue={name?.value}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button onClick={() => updateAuthor()} disabled={!name?.value || !born}>update author</button>
      </form>
    </div>
  );
};

export default Authors;
