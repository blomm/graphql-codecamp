import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div></div>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList></BookList>
      </div>
    </ApolloProvider>
  );
}

export default App;
