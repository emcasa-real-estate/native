import {ApolloServer} from 'apollo-server-express'
import {buildClientSchema} from 'graphql'
import {addMockFunctionsToSchema} from 'graphql-tools'

import mocks from './mocks'

export async function createSchema() {
  // Make a GraphQL schema with no resolvers
  const schema = buildClientSchema(require('./schema.json'))
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
