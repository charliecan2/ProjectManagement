const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, buildSchema } = require('graphql');
const { projects, clients } = require('../sampleData');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
})

// Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientID: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        return clients.find(client => client.id === args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})