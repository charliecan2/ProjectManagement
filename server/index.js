const express = require("express");
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const PORT = process.env.PORT || 5000;


const root = { hello: () => 'Hello World!' }
const app = express(); 

// 'graphql' is the endpoint that our app is using
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(PORT, console.log(`Listening to PORT: ${PORT}`));