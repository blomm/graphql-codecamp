import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries/queries';

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { addedBook }] = useMutation(addBookMutation);

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

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

  const submitForm = (e) => {
    e.preventDefault();
    addBook({ variables: { name, genre, authorId }, refetchQueries: [{ query: getBooksQuery }] });
    console.log('name: ' + name + ', genre: ' + genre + ', authorId: ' + authorId);
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
