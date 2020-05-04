import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
      age
    }
  }
`;

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    } else if (data) {
      return data.authors.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      ));
    }
  };

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
