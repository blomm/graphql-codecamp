import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div id="main">
      <ul id="book-list">
        {data.books.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
