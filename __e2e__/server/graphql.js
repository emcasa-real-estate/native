import {buildClientSchema} from 'graphql'
import {addMockFunctionsToSchema} from 'graphql-tools'
import mocks from './mocks'

export default async function createSchema() {
  // Make a GraphQL schema with no resolvers
  const schema = buildClientSchema(require('./schema.json'))
  // Add mocks, modifies schema in place
  addMockFunctionsToSchema({schema, mocks})
  return schema
}
