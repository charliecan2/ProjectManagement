const express = require("express");
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express(); 

//connect to database
connectDB();

app.use(cors());

// 'graphql' is the endpoint that our app is using
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT, console.log(`Listening to PORT: ${PORT}`));