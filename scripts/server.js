#!/usr/bin/env node
const _ = require('lodash')
const path = require('path')
const http = require('http')
const crypt = require('crypto')
const yakbak = require('yakbak')

const REPLAY_MODE = process.env.REPLAY_MODE || 'replay'
const REPLAY_PORT = process.env.REPLAY_PORT || 4040
const RECORD_PORT = process.env.RECORD_PORT || 4000

const server = yakbak(`http://localhost:${RECORD_PORT}`, {
  dirname: path.resolve(__dirname, '../__test__/fixtures'),
  noRecord: REPLAY_MODE !== 'record',
  hash(req) {
    return crypt
      .createHash('md5')
      .update(req.headers.host + req.url)
      .digest('hex')
  }
})

http.createServer(server).listen(
  {
    port: REPLAY_PORT
  },
  () => {
    // eslint-disable-next-line no-console
    console.log(
      `Replay server listening on localhost:${REPLAY_PORT} in ${REPLAY_MODE} mode`
    )
  }
)
