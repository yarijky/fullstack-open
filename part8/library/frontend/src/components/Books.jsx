import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`;

const Books = () => {
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

  if (books.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((book) => (
            <Book key={book.title} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Book = ({ book }) => {
  return (
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.published}</td>
    </tr>
  );
};

export default Books;
