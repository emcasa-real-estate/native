import path from 'path'
import detox from 'detox'
import {exec} from 'child_process'

import pkg from '@/package.json'

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

global.screenShot = (fileName = timestamp()) =>
  new Promise((resolve) =>
    exec(
      `xcrun simctl io "${DEVICE_NAME}" screenshot ${SCREENSHOT_PATH}/${fileName}.png`,
      (error) => {
        /* eslint-disable no-console */
        if (error) console.error(error.message)
        else
          console.info(`Saved screenshot to ${SCREENSHOT_PATH}/${fileName}.png`)
        resolve()
        /* eslint-enable */
      }
    )
  )

jest.setTimeout(180000)

beforeAll(() => detox.init(pkg.detox))

afterEach(() => screenShot())

afterAll(() => detox.cleanup())
