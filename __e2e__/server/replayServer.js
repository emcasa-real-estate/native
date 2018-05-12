const path = require('path')
const crypt = require('crypto')
const yakbak = require('yakbak')

module.exports = ({port, replayMode}) =>
  yakbak(`http://localhost:${port}`, {
    dirname: path.join(__dirname, 'fixtures'),
    noRecord: replayMode !== 'record',
    hash(req) {
      return crypt
        .createHash('md5')
        .update(req.headers.host + req.url)
        .digest('hex')
    }
  })
