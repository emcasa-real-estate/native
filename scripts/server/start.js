#!/usr/bin/env node
/* eslint-disable no-console */
const _ = require('lodash')
const fs = require('fs')
const cleanup = require('node-cleanup')

const server = require('./index.js')

const time = Date.now()

if (_.includes(process.argv, '--diff')) {
  console.log(
    'Using diff mode. Untouched endpoints will be removed on shutdown.'
  )
  cleanup((code) => {
    console.log(code)
    if (code) return
    const fixtures = `${__dirname}/fixtures`
    const files = fs.readdirSync(fixtures)
    console.log('\nRemoving unused endpoints ...')
    files.forEach((filename) => {
      const stats = fs.statSync(`${fixtures}/${filename}`)
      const atime = Date.parse(stats.atime)
      if (atime < time) {
        console.log(filename)
        fs.unlinkSync(`${fixtures}/${filename}`)
      }
    })
  })
}

server.start()
