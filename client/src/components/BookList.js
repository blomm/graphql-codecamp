import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [selectedId, setSelectedId] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleClick = (i) => {
    setSelectedId(i);
  };
  return (
    <div id="main">
      <ul id="book-list">
        {data.books.map((b) => (
          <li key={b.id} onClick={() => handleClick(b.id)}>
            {b.name}
          </li>
        ))}
      </ul>
      <BookDetails selectedId={selectedId} />
    </div>
  );
}

export default BookList;
