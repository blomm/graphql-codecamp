const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'Getting Windy', genre: 'Fantasy', id: '4', authorId: '1' },
  { name: 'Empires strike back', genre: 'Fantasy', id: '5', authorId: '2' },
  { name: 'Earth Tones', genre: 'Sci-Fi', id: '6', authorId: '3' },
];

var authors = [
  { name: 'Dave Smith', age: 19, id: '1' },
  { name: 'Claire Bear', age: 13, id: '2' },
  { name: 'Tim Foolery', age: 41, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find((a) => a.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter((a) => a.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / source

        return books.find((b) => b.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / source

        return authors.find((a) => a.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
