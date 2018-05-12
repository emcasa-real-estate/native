#!/usr/bin/env node
const express = require('express')
const createReplayServer = require('./replayServer')

const REPLAY_MODE = process.env.REPLAY_MODE || 'replay'
const REPLAY_PORT = process.env.REPLAY_PORT || 4040
const RECORD_PORT = process.env.RECORD_PORT || 4000

const server = express()

server.use(
  createReplayServer({
    port: RECORD_PORT,
    replayMode: REPLAY_MODE
  })
)

server.use((req, res) => {
  server.emit('response', {req, res})
  return res
})

server.start = () =>
  server.listen(REPLAY_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Replay server listening on localhost:${REPLAY_PORT} in ${REPLAY_MODE} mode`
    )
  })

module.exports = server
