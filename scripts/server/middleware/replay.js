const path = require('path')
const crypt = require('crypto')
const yakbak = require('yakbak')

module.exports = ({port, replayMode}) =>
  yakbak(`http://localhost:${port}`, {
    dirname: path.join(__dirname, '../fixtures'),
    noRecord: replayMode !== 'record',
    hash(req, body) {
      let payload = req.method + req.headers.host + req.url + body
      return crypt
        .createHash('md5')
        .update(payload)
        .digest('hex')
    }
  })
