const path = require('path')
const crypt = require('crypto')
const yakbak = require('yakbak')

module.exports = ({port, replayMode}) =>
  yakbak(`http://localhost:${port}`, {
    dirname: path.join(__dirname, '../fixtures'),
    noRecord: replayMode !== 'record',
    hash(req) {
      let payload = req.method + req.headers.host + req.url
      console.log('...')
      if (req.method !== 'GET') payload += JSON.stringify(req.body, null, 2)
      console.log(payload, req.body)
      return crypt
        .createHash('md5')
        .update(payload)
        .digest('hex')
    }
  })
