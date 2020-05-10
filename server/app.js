const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

app.use(cors());

mongoose
  .connect(
    'mongodb+srv://mikey:test123@graphql1-dwbwc.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to database');
  })
  .catch(function (error) {
    console.log('Error connecting: ' + error);
  });

// wrapper for new ApolloServer(......)
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('listening on port 4000');
});
