import path from 'path'
import fs from 'fs'
import {ApolloServer} from 'apollo-server-express'
import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools'

import mocks from './mocks'

export async function createSchema() {
  const typeDefs = fs
    .readFileSync(path.join(__dirname, 'schema.graphql'))
    .toString()
  // Make a GraphQL schema with no resolvers
  const schema = makeExecutableSchema({
    typeDefs
  })
  // Add mocks, modifies schema in place
  addMockFunctionsToSchema({schema, mocks})
  return schema
}

export default async function applyMiddleware(app) {
  const schema = await createSchema()
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    debug: true
  })
  server.applyMiddleware({
    app,
    path: '/graphql_api',
    gui: {endpoint: '/graphiql'}
  })
}
