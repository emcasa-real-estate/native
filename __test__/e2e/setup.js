// Runs before each test case
import detox from 'detox'
import pkg from '@/package.json'

// import '../setup.framework'

jest.setTimeout(120000)

beforeAll(async () => {
  await detox.init(pkg.detox)
})

afterAll(async () => {
  await detox.cleanup()
})

beforeEach(async () => {
  await device.reloadReactNative()
})
