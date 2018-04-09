// Runs before each test case
import detox from 'detox'
import pkg from '@/package.json'

jest.setTimeout(120000)

beforeAll(async () => {
  await detox.init(pkg.detox)
  await device.launchApp()
})

afterAll(async () => {
  await detox.cleanup()
})

beforeEach(async () => {
  await device.reloadReactNative()
})
