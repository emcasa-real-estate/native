/* eslint-disable no-console */
import path from 'path'
import detox from 'detox'
import {promisify} from 'util'
import * as child_process from 'child_process'

import pkg from '../package.json'

const exec = promisify(child_process.exec)

const DEVICE_NAME = process.env.DEVICE_NAME || 'booted'
const DB_NAME = process.env.CLEANUP_DB_NAME
const SCREENSHOT_PATH =
  process.env.SCREENSHOT_PATH || path.join(__dirname, '../tmp/screenshots')

const timestamp = () => {
  const date = new Date()
  return 'Y-m-d.@t'
    .replace('Y', date.getFullYear())
    .replace('m', date.getMonth() + 1)
    .replace('d', date.getDate())
    .replace('@t', date.getTime())
}

global.screenShot = async (fileName = timestamp()) => {
  try {
    await exec(
      `xcrun simctl io "${DEVICE_NAME}" screenshot ${SCREENSHOT_PATH}/${fileName}.png`
    )
    console.info(`Saved screenshot to ${SCREENSHOT_PATH}/${fileName}.png`)
  } catch (error) {
    console.error(error.message)
  }
}

async function resetDatabase() {
  if (!DB_NAME) return
  const dumpFile = `${__dirname}/server/re_test.dump`
  try {
    await exec(`psql ${DB_NAME} < ${dumpFile}`)
    console.log(`Database ${DB_NAME} has been reset.`)
  } catch (error) {
    console.error(error.message)
  }
}

jest.setTimeout(180000)

beforeAll(() => detox.init(pkg.detox))

beforeAll(() => resetDatabase())

afterEach(() => screenShot())

afterAll(() => detox.cleanup())
