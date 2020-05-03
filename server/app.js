const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const mongoose = require('mongoose');
const schema = require('./schema/schema');

mongoose
  .connect(
    'mongodb+srv://mikeb:test123@graphql1-dwbwc.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to database');
  });

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('listening on port 4000');
});
