/* eslint-disable no-console */
import path from 'path'
import detox from 'detox'
import {promisify} from 'util'
import * as child_process from 'child_process'

import pkg from '../package.json'

const exec = promisify(child_process.exec)

const toBool = (val) =>
  ['true', 'yes', 'y'].findIndex(
    (str) => val == str || val == str.toUpperCase()
  ) !== -1

const DEVICE_NAME = process.env.DEVICE_NAME || 'booted'
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
  try {
    await exec(
      [
        'mix do ecto.drop, ecto.drop, ecto.create, ecto.migrate',
        'mix run priv/repo/seeds.e2e.exs'
      ].join('&&'),
      {
        cwd: path.resolve(__dirname, '../backend'),
        env: {MIX_ENV: 'e2e'}
      }
    )
    console.log('Database has been reset.')
  } catch (error) {
    console.error(error.message)
  }
}

jest.setTimeout(180000)

beforeAll(() => detox.init(pkg.detox))

if (toBool(process.env.CLEANUP)) beforeAll(() => resetDatabase())

if (toBool(process.env.SCREENSHOT)) afterEach(() => screenShot())

afterAll(() => detox.cleanup())
