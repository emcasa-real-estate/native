const express = require('express')
const createReplayServer = require('./middleware/replay')

const REPLAY_MODE = process.env.REPLAY_MODE || 'replay'
const REPLAY_PORT = process.env.REPLAY_PORT || 4040
const RECORD_PORT = process.env.RECORD_PORT || 4000

const app = express()

app.use(
  createReplayServer({
    port: RECORD_PORT,
    replayMode: REPLAY_MODE
  })
)

module.exports = {
  app,
  start: () =>
    new Promise((resolve) => {
      /* eslint-disable no-console */
      console.info(`Starting replay server in ${REPLAY_MODE} mode`)
      console.info(`Listening on localhost:${REPLAY_PORT}`)
      /* eslint-enable */
      this.server = app.listen(REPLAY_PORT, resolve)
    }),
  stop: () => new Promise((resolve) => this.server.close(resolve))
}
