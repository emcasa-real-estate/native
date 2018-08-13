#!/usr/bin/env babel-node
/* eslint-disable no-console */
import {promisify} from 'util'
import express from 'express'

import applyApolloMiddleware from './graphql'
import apiMiddleware from './api'

const PORT = process.env.PORT || 4000

const app = express()

const listen = promisify((port, fun) => app.listen(port, fun))

async function start() {
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`)
    next()
  })
  await applyApolloMiddleware(app)
  app.use('/', apiMiddleware)
  app.use((req) => {
    console.log(`Couldn't respond to ${req.url}`)
    if (req.body) console.log('Request body:', req.body)
  })
  await listen(PORT)
  console.log(`Mock server is listening on port ${PORT}`)
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
