#!/usr/bin/env babel-node
import {promisify} from 'util'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'

import createSchema from './graphql'

const PORT = process.env.PORT || 4000

const app = express()

const listen = promisify((port, fun) => app.listen(port, fun))

async function start() {
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
  await listen(PORT)
  console.log(`Mock server is listening on port ${PORT}`)
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
