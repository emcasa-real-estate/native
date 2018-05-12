import detox from 'detox'
import pkg from '@/package.json'

jest.setTimeout(120000)

beforeAll(async () => {
  await detox.init(pkg.detox)
})

afterAll(async () => {
  await detox.cleanup()
})
