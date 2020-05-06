import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
      age
    }
  }
`;

export const getSingleBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
