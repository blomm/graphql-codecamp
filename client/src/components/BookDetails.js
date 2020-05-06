import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getSingleBookQuery } from '../queries/queries';

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(getSingleBookQuery, {
    variables: { id: props.selectedId },
    skip: !props.selectedId,
  });
  console.log('data: ' + JSON.stringify(data));

  const displayData = () => {
    if (!props.selectedId) return <p>Select a book...</p>;
    else if (props.selectedId && data) {
      console.log(JSON.stringify(data));
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>Genre: {data.book.genre}</p>
          <p>Author: {data.book.author.name}</p>
          <p>All books by this author: </p>
          <ul className="other-books">
            {data.book.author.books.map((b) => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div id="book-details">
      <p>Output book details here.</p>
      {displayData()}
    </div>
  );
};

export default BookDetails;
